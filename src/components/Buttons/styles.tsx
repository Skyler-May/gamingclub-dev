import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 120,
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#fff',
    },

    addDataButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
        borderBlockColor: 'black',
    },

    addDataButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        borderColor: '#ddd',
        fontSize: 16,
        backgroundColor: 'darkblue',
        width: 100,
        height: 50,
    },
    addDataButtonText: {
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        padding: 5,
        marginHorizontal: 5,
        height: 50,
        width: 100,
        fontSize: 14,
        color: 'gray',
    },

    // 快捷金额
    amountButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
        // backgroundColor: 'darkgreen',
        height: 50,
    },
    amountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blueviolet',
        padding: 10,
        marginHorizontal: 3,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'darkseagreen',
        width: 50,
        height: 50,
    },
    iconButton: {
        flexDirection: 'column',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    amountButtonText: {
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        zIndex: 1,
    },

    selectedAmountButton: {
        backgroundColor: 'darkblue',
    },

    //模态框
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        height: 40,
        color: 'orangered',
    },
    modalSaveButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    modalSaveButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalTitle: {
        fontSize: 18,
        color: 'darkblue',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalAmountLabel: {
        fontSize: 14,
        color: 'darkblue',
    },
    countContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        // backgroundColor: '#ddd',
        width: 40,
        height: 40,
    },
    text: {
        fontSize: 12,
        color: 'gray',
    },
    count: {
        color: 'red', // 设置内部文本的颜色为红色，您可以根据需要更改颜色
        fontSize: 14,
    },
});

export default styles;
