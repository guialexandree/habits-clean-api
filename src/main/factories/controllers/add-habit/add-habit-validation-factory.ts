import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeHabitValidation = (): ValidationComposite => {
	const validations: Validation[] = []

	for (const field of ['title', 'weekDays']) {
		validations.push(new RequiredFieldValidation(field))
	}

	return new ValidationComposite(validations)
}
