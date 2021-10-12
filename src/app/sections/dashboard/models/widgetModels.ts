export interface PieChartModel{
    value: Array<PieChartDataMOdel>,
    total: number
}

export interface PieChartDataMOdel{
    name: string,
    value: string
}