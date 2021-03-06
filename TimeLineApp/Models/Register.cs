﻿using System.ComponentModel.DataAnnotations;

namespace TimeLineApp.Models
{
    public class Register
    {
        [Required(ErrorMessage = "Не введены данные")]
        [Display(Name = "Имя пользователя")]
        public string Login { get; set; }
        [Required(ErrorMessage = "Не введены данные")]
        [Display(Name = "E-Mail")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Не введены данные")]
        [Display(Name = "Пароль")]
        public string Password1 { get; set; }
        [Required(ErrorMessage = "Не введены данные")]
        [Display(Name = "Повторение пароля")]
        public string Password2 { get; set; }
    }
}
