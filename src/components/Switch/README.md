# 页面切换器

## 用法：

```bash
// 父组件
import React from 'react';
import { View, Text } from 'react-native';

// 导入子页面组件
import PagesSwitch from '../../components/Switch/PagesSwitch';
import TestPage1 from './TestPage1';
import TestPage2 from './TestPage2';
import TestPage3 from './TestPage3';
import TestPage4 from './TestPage4';

const ParentComponent = () => {
    // 定义子页面数组
    const pages = [
        { key: '1', component: <TestPage1 />, title: '商店' }, // key 值可为 唯一字母、数字
        { key: '2', component: <TestPage2 />, title: '酒店' },
        { key: '3', component: <TestPage3 />, title: '饭店' },
        { key: '4', component: <TestPage4 />, title: '咖啡店' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <Text>这是父组件</Text>
            {/* 使用 PageSwitch 组件，并传入子页面数组作为 props */}
            <PagesSwitch pages={pages} />
        </View>
    );
};

```