# 倒计时

## 使用说明

```bash
import React from 'react';
import CountdownTimer from './CountdownTimer';

const ParentComponent: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* 设置睡眠开始时间为 23:15，结束时间为 08:00 */}
            <CountdownTimer sleepStartTime="23:15" sleepEndTime="08:00" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ParentComponent;
```