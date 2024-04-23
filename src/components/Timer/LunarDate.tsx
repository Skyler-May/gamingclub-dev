import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import LunarCalendar from 'lunar-calendar';

interface LunarInfo {
    year: number;
    month: number;
    day: number;
    zodiac: string;
    ganZhiYear: string;
    ganZhiMonth: string;
    ganZhiDay: string;
}

const useLunarDate = () => {
    const [lunarInfo, setLunarInfo] = useState<LunarInfo>({
        year: 0,
        month: 0,
        day: 0,
        zodiac: '',
        ganZhiYear: '',
        ganZhiMonth: '',
        ganZhiDay: ''
    });
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const timerID = setInterval(() => {
            updateDateTime();
        }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    const updateDateTime = () => {
        const now = moment().tz('Asia/Shanghai');

        // 更新公历时间
        setCurrentTime(now.format('YYYY-MM-DD HH:mm:ss'));

        // 获取当前年份、月份和日期
        const currentYear = now.year();
        const currentMonth = now.month() + 1;
        const currentDate = now.date();

        // 获取农历日期
        const lunarDate = LunarCalendar.solarToLunar(currentYear, currentMonth, currentDate);

        // 更新农历信息
        setLunarInfo({
            year: lunarDate.lunarYear,
            month: lunarDate.lunarMonth,
            day: lunarDate.lunarDay,
            zodiac: lunarDate.zodiac,
            ganZhiYear: lunarDate.GanZhiYear,
            ganZhiMonth: lunarDate.GanZhiMonth,
            ganZhiDay: lunarDate.GanZhiDay
        });
    };

    return { lunarInfo, currentTime };
};

export default useLunarDate;
