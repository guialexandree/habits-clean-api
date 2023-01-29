export interface LoadDayRepository {
	loadOrCreate: (date: Date) => Promise<string>
}
