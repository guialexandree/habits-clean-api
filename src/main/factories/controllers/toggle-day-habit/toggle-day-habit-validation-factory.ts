import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeToggleDayHabitValidation = (): ValidationComposite => {
	const validations: Validation[] = []

	for (const field of ['habitId']) {
		validations.push(new RequiredFieldValidation(field))
	}

	return new ValidationComposite(validations)
}
