import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useLunarDate from '../Timer/LunarDate';
import useChineseZodiacAges from './GetChineseZodiacAges';
import Countdown from '../Controller/ButtonLockController';
import { useNumberContext } from '../Contexts/NumberContext';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
    options: string[];
}

const ZodiacOptions: React.FC<Props> = ({ options }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { selectedNumbers, setSelectedNumbers } = useNumberContext();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };


    // 生肖
    const applyOptionLogic = (Numbers: number[], option: string) => {
        const updatedOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(opt => opt !== option)
            : [...selectedOptions, option];
        setSelectedNumbers(selectedOptions.includes(option)
            ? selectedNumbers.filter(number => !Numbers.includes(number))
            : [...selectedNumbers, ...Numbers]);
        setSelectedOptions(updatedOptions);

    };

    // 自动更新生肖
    const { lunarInfo } = useLunarDate();
    const zodiacAges = useChineseZodiacAges();

    const mouseAge = ((zodiacAges.find(({ zodiac }) => zodiac === '鼠')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '鼠')?.age ?? 0) + 1); // 在 age 为 undefined 时提供默认值 0
    const bullAge = ((zodiacAges.find(({ zodiac }) => zodiac === '牛')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '牛')?.age ?? 0) + 1);
    const tigerAge = ((zodiacAges.find(({ zodiac }) => zodiac === '虎')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '虎')?.age ?? 0) + 1);
    const rabbitAge = ((zodiacAges.find(({ zodiac }) => zodiac === '兔')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '兔')?.age ?? 0) + 1);
    const dragonAge = ((zodiacAges.find(({ zodiac }) => zodiac === '龙')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '龙')?.age ?? 0) + 1);
    const snakeAge = ((zodiacAges.find(({ zodiac }) => zodiac === '蛇')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '蛇')?.age ?? 0) + 1);
    const horseAge = ((zodiacAges.find(({ zodiac }) => zodiac === '马')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '马')?.age ?? 0) + 1);
    const sheepAge = ((zodiacAges.find(({ zodiac }) => zodiac === '羊')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '羊')?.age ?? 0) + 1);
    const monkeyAge = ((zodiacAges.find(({ zodiac }) => zodiac === '猴')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '猴')?.age ?? 0) + 1);
    const chickenAge = ((zodiacAges.find(({ zodiac }) => zodiac === '鸡')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '鸡')?.age ?? 0) + 1);
    const dogAge = ((zodiacAges.find(({ zodiac }) => zodiac === '狗')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '狗')?.age ?? 0) + 1);
    const pigAge = ((zodiacAges.find(({ zodiac }) => zodiac === '猪')?.age ?? 0) + 1) > 12 ? 1 : ((zodiacAges.find(({ zodiac }) => zodiac === '猪')?.age ?? 0) + 1);

    const incrementValue = 12;

    const generateAnimalNumbers = (age: number, length: number) => {
        return Array.from({ length }, (_, index) => age + index * incrementValue);
    };

    const logSelectedNumbers = () => {
        console.log("Selected Numbers:");
        selectedNumbers.forEach(number => {
            console.log(number);
        });
    };

    // mouse
    const option1Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '鼠') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(mouseAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '鼠';
        applyOptionLogic(animalNumbers, option);
    };

    // bull
    const option2Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '牛') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(bullAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '牛';
        applyOptionLogic(animalNumbers, option);
    };

    // tiger
    const option3Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '虎') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(tigerAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '虎';
        applyOptionLogic(animalNumbers, option);
    };

    // rabbit
    const option4Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '兔') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(rabbitAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '兔';
        applyOptionLogic(animalNumbers, option);
    };

    // dragonAge
    const option5Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '龙') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(dragonAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '龙';
        applyOptionLogic(animalNumbers, option);
    };

    // snakeAge
    const option6Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '蛇') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(snakeAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '蛇';
        applyOptionLogic(animalNumbers, option);
    };

    // horseAge
    const option7Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '马') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(horseAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '马';
        applyOptionLogic(animalNumbers, option);
    };

    // sheepAge
    const option8Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '羊') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(sheepAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '羊';
        applyOptionLogic(animalNumbers, option);
    };

    // monkeyAge
    const option9Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '猴') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(monkeyAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '猴';
        applyOptionLogic(animalNumbers, option);
    };

    // chickenAge
    const option10Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '鸡') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(chickenAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '鸡';
        applyOptionLogic(animalNumbers, option);
    };

    // dogAge
    const option11Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '狗') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(dogAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '狗';
        applyOptionLogic(animalNumbers, option);
    };

    // pigAge
    const option12Logic = () => {
        let zodiacNumbersLength = 4;
        if (lunarInfo.zodiac === '猪') {
            console.log(`Matched zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 5; // 如果匹配上，则将 zodiacNumbersLength 设置为 5
        } else {
            console.log(`No match for zodiac: ${lunarInfo.zodiac}`);
            zodiacNumbersLength = 4; // 否则将 zodiacNumbersLength 设置为 4
        }

        const animalNumbers = generateAnimalNumbers(pigAge, zodiacNumbersLength);
        console.log('Animal Numbers:', animalNumbers);
        const option = '猪';
        applyOptionLogic(animalNumbers, option);
    };

    const option13Logic = () => {
        const shapeNumbers = Array.from({ length: 24 }, (_, index) => index + 1);
        const option = '小';
        applyOptionLogic(shapeNumbers, option);
    };
    const option14Logic = () => {
        const shapeNumbers = Array.from({ length: 25 }, (_, index) => index + 25);
        const option = '大';
        applyOptionLogic(shapeNumbers, option);
    };

    const option15Logic = () => {
        const shapeNumbers = Array.from({ length: 49 }, (_, index) => index + 1).filter(num => num % 2 !== 0);
        const option = '奇';
        applyOptionLogic(shapeNumbers, option);
    };

    const option16Logic = () => {
        const shapeNumbers = Array.from({ length: 49 }, (_, index) => index + 1).filter(num => num % 2 === 0);
        const option = '偶';
        applyOptionLogic(shapeNumbers, option);
    };

    const option17Logic = () => {
        const allNumbers = Array.from({ length: 49 }, (_, index) => index + 1);
        const option = '全';
        applyOptionLogic(allNumbers, option);
    };

    // clean
    const option18Logic = () => {
        const option = '清';
        setSelectedOptions([]);
        setSelectedNumbers([]);
    };

    const optionLogics: { [key: string]: () => void } = {
        '鼠': option1Logic,
        '牛': option2Logic,
        '虎': option3Logic,
        '兔': option4Logic,
        '龙': option5Logic,
        '蛇': option6Logic,
        '马': option7Logic,
        '羊': option8Logic,
        '猴': option9Logic,
        '鸡': option10Logic,
        '狗': option11Logic,
        '猪': option12Logic,
        '小': option13Logic,
        '大': option14Logic,
        '奇': option15Logic,
        '偶': option16Logic,
        '全': option17Logic,
        '清': option18Logic,
        // 添加更多的选项和逻辑函数
    };

    const toggleOption = (option: string) => {
        const logicFunction = optionLogics[option];
        if (logicFunction) {
            logicFunction();
        } else {
            if (selectedOptions.includes(option)) {
                setSelectedOptions(selectedOptions.filter(item => item !== option));
                setSelectedNumbers(selectedNumbers.filter(number => number !== parseInt(option)));
            } else {
                setSelectedOptions([...selectedOptions, option]);
                setSelectedNumbers([...selectedNumbers, parseInt(option)]);
            }
        }
    };

    // console.log('Expanded:', expanded); // 添加调试语句
    // console.log('Selected Options:', selectedOptions); // 添加调试语句

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleExpand} style={[styles.header,]}>
                <Text style={styles.headerText}>
                    {expanded ?
                        <Icon name="chevrons-up" size={14} color="gray" />
                        :
                        <Icon name="chevrons-down" size={14} color="gray" />
                    }
                </Text>
            </TouchableOpacity>
            {options ? (
                expanded ? (
                    <View style={styles.optionsContainer}>
                        {options.slice(0, 18).reduce((acc: React.ReactNode[][], option, index) => {
                            const groupIndex = Math.floor(index / 6);
                            if (!acc[groupIndex]) {
                                acc[groupIndex] = [];
                            }
                            acc[groupIndex].push(
                                <TouchableOpacity

                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedOptions.includes(option) && styles.selectedOptionButton,
                                    ]}
                                    onPress={() => toggleOption(option)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            selectedOptions.includes(option) && styles.selectedOptionText,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                            return acc;
                        }, []).map((row, index) => (
                            <View key={index} style={styles.row}>
                                {row}
                            </View>
                        ))}
                    </View>
                ) : null
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    header: {
        // borderColor: 'gray',
        backgroundColor: '#ddd',
        width: '100%',
    },
    headerText: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    optionsContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    optionButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    optionText: {
        textAlign: 'center',
        color: 'gray',
    },
    selectedOptionButton: {
        backgroundColor: 'midnightblue',
    },
    selectedOptionText: {
        fontWeight: 'bold',
        color: 'white',
    },
    // 锁定按钮背景色
    // disabledButton: {
    //     backgroundColor: 'gray',
    // },
});

export default ZodiacOptions;
