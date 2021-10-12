export interface DashboardModel {
    role: string,
    widgets: Array<widget>
}

export interface widget {
    charttype: string,
    column: number,
    row:number,
    name: string,
    isCardExpanded:boolean
}