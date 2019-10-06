using FluentValidation;

namespace AngularUI.Models.Validations
{
    public class CredentialsViewModelValidator : AbstractValidator<LoginViewModel>
    {
        public CredentialsViewModelValidator()
        {
            RuleFor(vm => vm.username).NotEmpty().WithMessage("Username cannot be empty");
            RuleFor(vm => vm.password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.password).Length(6, 12).WithMessage("Password must be between 6 and 12 characters");
        }
    }
}
