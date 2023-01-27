import { Validation } from '@/presentation/protocols'
import { RequiredArrayValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeHabitValidation = (): ValidationComposite => {
	const validations: Validation[] = []

	for (const field of ['title']) {
		validations.push(new RequiredFieldValidation(field))
	}
	validations.push(new RequiredArrayValidation('weekDays'))

	return new ValidationComposite(validations)
}
