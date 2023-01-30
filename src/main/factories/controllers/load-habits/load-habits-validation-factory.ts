import { Validation } from '@/presentation/protocols'
import { DateFieldValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeLoadHabitsValidation = (): ValidationComposite => {
	const validations: Validation[] = []

	for (const field of ['date']) {
		validations.push(new RequiredFieldValidation(field))
	}

	validations.push(new DateFieldValidation('date'))

	return new ValidationComposite(validations)
}
