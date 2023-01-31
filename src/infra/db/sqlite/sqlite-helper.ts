export const SqliteHelper = {
	map (data: any): any {
		const { created_at, weekDays, ...rest } = data

		return Object.assign({}, {
			createdAt: created_at,
			weekDays: weekDays.map(week => week.week_day)
		}, rest)
	},

	mapCollection (dataList: any): any[] {
		return dataList.map(item => SqliteHelper.map(item))
	}
}
