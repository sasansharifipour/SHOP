using FluentValidation;

namespace AngularUI.Models.Validations
{
    public class RegistrationViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(s => s.mobile).NotEmpty().WithMessage("Mobile cannot be empty");
            RuleFor(s => s.password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(s => s.name).NotEmpty().WithMessage("FirstName cannot be empty");
            RuleFor(s => s.family).NotEmpty().WithMessage("LastName cannot be empty");
        }
    }
}
