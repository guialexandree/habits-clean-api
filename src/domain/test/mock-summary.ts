import faker from 'faker'
import { SummaryModel } from '@/domain/model'

export const mockSummaryModel = (): SummaryModel => {
	const amount = faker.datatype.number({ min: 5, max: 20 })

	return {
		id: faker.datatype.uuid(),
		date: faker.date.recent(),
		title: faker.random.words(),
		completed: amount - faker.datatype.number({ min: 0, max: 3 }),
		amount
	}
}
