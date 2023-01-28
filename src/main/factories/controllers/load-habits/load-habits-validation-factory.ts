import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeLoadHabitsValidation = (): ValidationComposite => {
	const validations: Validation[] = []

	for (const field of ['date']) {
		validations.push(new RequiredFieldValidation(field))
	}

	return new ValidationComposite(validations)
}
