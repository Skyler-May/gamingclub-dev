# 使用方法

## 示例：

```bash
import React from 'react';
import { View, Text } from 'react-native';
import SideTabNavigation from './SideTabNavigation'; // 假设该组件位于同一目录下

interface Tab {
    label: string;
    content: JSX.Element;
    isSelected: boolean;
}

const MyComponent = () => {

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const tabs: Tab[] = [
        {
            label: '商店',
            content: <View><PagesSwitch pages={pages} /></View>,
            isSelected: false, // 初始化 isSelected 属性
        },
        {
            label: '酒店',
            content: <View><Text>Content of Tab 2</Text></View>,
            isSelected: false,
        },
        {
            label: '奶茶店',
            content: <View><Text>Content of Tab 3</Text></View>,
            isSelected: false,
        },
        {
            label: '咖啡店',
            content: <View><Text>Content of Tab 4</Text></View>,
            isSelected: false,
        },
    ];

  return (
    // 根据需求添加或取消 View
    <View style={{ flex: 1 }}>
      <SideTabNavigation 
      tabs={tabs} 
      selectedTab={selectedTab} 
      setSelectedTab={setSelectedTab} 
    />
    </View>
  );
};

export default MyComponent;

```