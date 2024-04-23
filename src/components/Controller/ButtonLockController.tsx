import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment-timezone';

interface CountdownProps {
    startTime: { hour: number, minute: number };
    endTime: { hour: number, minute: number };
    children: (isDisabled: boolean, remainingTime: { hours: number, minutes: number }) => React.ReactNode;
}

const Countdown: React.FC<CountdownProps> = ({ startTime, endTime, children }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [remainingTime, setRemainingTime] = useState({ hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateRemainingTime = () => {
            const currentTime = moment().tz('Asia/Shanghai'); // 使用亚洲/上海时区

            const start = getMoment(startTime);
            const end = getMoment(endTime);

            if (currentTime.isBefore(start)) {
                // 如果当前时间在起始时间之前，按钮启用
                setIsDisabled(false);
                updateRemainingTime(start, currentTime);
            } else if (currentTime.isBetween(start, end)) {
                // 如果当前时间在起始时间和结束时间之间，按钮禁用
                setIsDisabled(true);
                updateRemainingTime(end, currentTime);
            } else {
                // 其他情况下，按钮启用，如果当前时间超过结束时间，设置结束时间为第二天的起始时间
                setIsDisabled(false);
                const nextStartTime = currentTime.clone().add(1, 'day').startOf('day').hour(startTime.hour).minute(startTime.minute);
                updateRemainingTime(nextStartTime, currentTime);
            }
        };

        const getMoment = (time: { hour: number, minute: number }): Moment => {
            return moment().tz('Asia/Shanghai').startOf('day').hour(time.hour).minute(time.minute);
        };

        const updateRemainingTime = (targetTime: Moment, currentTime: Moment) => {
            const duration = moment.duration(targetTime.diff(currentTime));
            const hours = duration.hours();
            const minutes = duration.minutes();
            setRemainingTime({ hours, minutes });
        };

        calculateRemainingTime(); // Calculate initially

        const interval = setInterval(() => {
            calculateRemainingTime(); // Recalculate every minute
        }, 60000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    return (
        <>
            {children(isDisabled, remainingTime)}
        </>
    );
};

export default Countdown;

