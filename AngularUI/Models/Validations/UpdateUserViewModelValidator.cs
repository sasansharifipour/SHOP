using FluentValidation;

namespace AngularUI.Models.Validations
{
    public class UpdateUserViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public UpdateUserViewModelValidator()
        {
            RuleFor(s => s.mobile).NotEmpty().WithMessage("Mobile cannot be empty");
            RuleFor(s => s.name).NotEmpty().WithMessage("FirstName cannot be empty");
            RuleFor(s => s.family).NotEmpty().WithMessage("LastName cannot be empty");
        }
    }
}
