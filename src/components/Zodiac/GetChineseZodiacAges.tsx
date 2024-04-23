import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import LunarCalendar from 'lunar-calendar';

interface ZodiacAges {
    zodiac: string;
    age: number;
}

const useChineseZodiacAges = () => {
    const [zodiacAges, setZodiacAges] = useState<ZodiacAges[]>([]);

    useEffect(() => {
        updateZodiacAges();
        const intervalID = setInterval(updateZodiacAges, 1000 * 60 * 60 * 24); // 每24小时更新一次
        return () => {
            clearInterval(intervalID);
        };
    }, []);

    const updateZodiacAges = () => {
        const currentYear = moment().tz('Asia/Shanghai').year();
        const zodiacAgesData: ZodiacAges[] = [];

        // 计算12生肖岁数
        for (let year = currentYear - 11; year <= currentYear; year++) {
            const lunarDate = LunarCalendar.solarToLunar(year, 1, 1);
            const zodiac = lunarDate.zodiac;
            const age = currentYear - year + 1;
            zodiacAgesData.push({ zodiac, age });
        }

        setZodiacAges(zodiacAgesData);
    };

    return zodiacAges;
};

export default useChineseZodiacAges;
