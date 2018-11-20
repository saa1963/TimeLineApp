import { TimeLine } from './timeline'
import { makeColor } from './colorutils'
import { ContextMenu, DIVIDER } from './contextmenu'

const MIN_GAP = 100
let PERIOD_TYPE = TimeLine.EnumPeriod.day
const HTOP = 56

let timeLines = []
let ctx;

(function main () {
  let isDragDrop = false
  let indLine

  let menuitems = [
    {
      'id': 'new',
      'text': 'Новая',
      'icon': '<i class="far fa-file"></i></i>',
      'events': {
        'click': NewTmDialog
      }
    },
    {
      'id': 'load',
      'text': 'Загрузить',
      'icon': '<i class="far fa-folder-open"></i>',
      'events': {
        'click': (e) => {
          LoadTimeLine()
        }
      }
    },
    {
      'id': 'save',
      'text': 'Сохранить',
      'icon': '<i class="far fa-save"></i>',
      'enabled': false
    },
    {
      'id': 'line',
      'type': DIVIDER
    },
    {
      'id': 'period',
      'text': 'Периодичность',
      'sub': [
        {
          'id': TimeLine.EnumPeriod.day,
          'text': 'День',
          'icon': '<i class="fas fa-angle-down"></i>',
          'events': {
            'click': (e) => {
              SwitchPeriod(menuCtx, TimeLine.EnumPeriod.day)
            }
          }
        },
        {
          'id': TimeLine.EnumPeriod.month,
          'text': 'Месяц',
          'events': {
            'click': (e) => {
              SwitchPeriod(menuCtx, TimeLine.EnumPeriod.month)
            }
          }
        },
        {
          'id': TimeLine.EnumPeriod.year,
          'text': 'Год',
          'events': {
            'click': (e) => {
              SwitchPeriod(menuCtx, TimeLine.EnumPeriod.year)
            }
          }
        },
        {
          'id': TimeLine.EnumPeriod.decade,
          'text': 'Десятилетие',
          'events': {
            'click': (e) => {
              SwitchPeriod(menuCtx, TimeLine.EnumPeriod.decade)
            }
          }
        },
        {
          'id': TimeLine.EnumPeriod.century,
          'text': 'Век',
          'events': {
            'click': (e) => {
              SwitchPeriod(menuCtx, TimeLine.EnumPeriod.century)
            }
          }
        }
      ]
    }
  ]
  let menuCtx = new ContextMenu(menuitems)

  let canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')

  canvas.onmousedown = (ev) => {
    if (ev.button === 0) {
      let pos = getMousePos(canvas, ev)
      indLine = getIndexLine(pos.y)
      if (indLine !== -1) {
        isDragDrop = true
        canvas.style.cursor = 'Pointer'
      }
    }
  }
  canvas.onmouseup = (ev) => {
    isDragDrop = false
    canvas.style.cursor = 'Default'
  }
  canvas.onmousemove = (ev) => {
    let data
    if (!isDragDrop) {
      for (let i = 0; i < timeLines.length; i++) {
        let pos = getMousePos(canvas, ev)
        data = timeLines[i].getCellValue(pos.x, pos.y)
        if (data !== timeLines[i].curdata) {
          if (timeLines[i].curdata !== -1) {
            timeLines[i].offBox()
          }
          if (data !== -1) {
            timeLines[i].onBox(data)
          }
          timeLines[i].curdata = data
        }
      }
    } else {
      timeLines[indLine].shift(ev.movementX)
      timeLines[indLine].draw(ctx)
    }
  }

  (window.onresize = (_) => {
    canvas.top = HTOP
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight - HTOP
    drawAll(ctx)
  })()

  $('#canvas').on('contextmenu', (e) => {
    let pos = getMousePos(canvas, e)
    indLine = getIndexLine(pos.y)
    let pMenu = menuCtx.menu.find(el => el.id === 'save')
    if (indLine === -1) {
      pMenu.enabled = false
    } else {
      pMenu.enabled = true
      pMenu.events = {
        'click': (e) => {
          timeLines[indLine].save()
        }
      }
    }
    menuCtx.reload()
    menuCtx.display(e)
    e.preventDefault()
  })

  $('#newTimeline').click((ev) => {
    NewTmDialog()
  })
  $('#load').click((ev) => {
    alert('load')
  })
  $('#save').click((ev) => {
    alert('save')
  })
  $('#options').click((ev) => {
    $('#typePeriod').val(TimeLine.EnumPeriod.year)
    $('#tmOptionsModal').modal()
  })
  $('#btnNewName').click((ev) => {
    $('#tmNameModal').modal('hide')
    NewTimeLine($('#tmName').val())
  })
  $('.closenamemodal').click((ev) => {
    $('#tmNameModal').modal('hide')
  })
  $('.closeoptionmodal').click((ev) => {
    $('#tmOptionsModal').modal('hide')
  })
  $('#tmName').keyup((ev) => {
    if ($('#tmName').val().trim() !== '') {
      $('#btnNewName').prop('disabled', false)
      if (ev.keyCode === 13) {
        $('#tmNameModal').modal('hide')
        NewTimeLine($('#tmName').val())
      }
    } else {
      $('#btnNewName').prop('disabled', true)
    }
  })
  $('#tmNameModal').on('shown.bs.modal', function () {
    $('#tmName').trigger('focus')
  })
  $('#action01').click((ev) => {
    alert('action01')
  })
})()

function LoadTimeLine () {
  let tl = TimeLine.load(ctx)
  NewTimeLine(tl.name, tl)
}

function NewTimeLine (name, tl) {
  let aY
  if ((((timeLines.length + 2) * MIN_GAP) + (timeLines.length + 1) * TimeLine.LINE_THICKNESS) > ctx.canvas.clientHeight) {
    alert('Достигнуто максимальное количество линий времени')
    return
  } else {
    aY = splitWorkspace(timeLines.length + 1)
  }
  let dt = TimeLine.getCurPeriod(PERIOD_TYPE)
    let nColor = makeColor()
  if (tl === undefined) {
    tl = new TimeLine(ctx, dt, 0, 0, PERIOD_TYPE, name)
  }
  timeLines.push(tl)
  for (let i = 0; i < timeLines.length; i++) {
    timeLines[i].y = aY[i]
    timeLines[i].color = nColor.next().value
  }
  drawAll()
}

function splitWorkspace (n) {
  let rt = []
  let m = (ctx.canvas.clientHeight - n * TimeLine.LINE_THICKNESS) / (n + 1) + 0.5
  for (let i = 0, y = m; i < n; i++, y += (m + TimeLine.LINE_THICKNESS)) {
    rt.push(y)
  }
  return rt
}

function getIndexLine (y) {
  for (let i = 0; i < timeLines.length; i++) {
    if (y >= timeLines[i].y && y < timeLines[i].y + TimeLine.LINE_THICKNESS) {
      return i
    }
  }
  return -1
}

function drawAll () {
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight)
  for (let i = 0; i < timeLines.length; i++) {
    timeLines[i].Period = PERIOD_TYPE
    timeLines[i].draw(ctx)
  }
}

function getMousePos (canvas, evt) {
  let rect = canvas.getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}

function NewTmDialog () {
  $('#tmName').val('')
  $('#btnNewName').prop('disabled', true)
  $('#tmNameModal').modal()
}

function SwitchPeriod (menuCtx, idPeriod) {
  menuCtx.menu.find(el => el.id === 'period').sub.forEach((el, nd, arr) => {
    if (el.id === idPeriod) {
      el.icon = '<i class="fas fa-angle-down"></i>'
    } else {
      el.icon = ''
    }
  })
  PERIOD_TYPE = idPeriod
  drawAll()
  menuCtx.reload()
}
