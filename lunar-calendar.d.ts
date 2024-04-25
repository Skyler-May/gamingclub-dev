declare module 'lunar-calendar' {
    interface LunarInfo {
        GanZhiDay: any;
        GanZhiMonth: any;
        GanZhiYear: any;
        zodiac: any;
        lunarYear: number;
        lunarMonth: number;
        lunarDay: number;
        // Add other properties as needed
    }

    function solarToLunar(year: number, month: number, day: number): LunarInfo;
    // Add other exported functions as needed
}
