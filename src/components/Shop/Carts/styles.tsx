import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    cartItemContainer: {
        marginBottom: 10,
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    input: {
        width: 100,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
        marginRight: 10,
        borderRadius: 5,
        color: 'black'
    },
    batchUpdate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ddd',
        marginBottom: 10,
        borderRadius: 5,
    },
    batchUpdateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    batchUpdateInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5,
        fontSize: 14,
        width: 100,
        color: 'darkgreen',
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkblue',
        height: 60,
        width: 100,
        borderRadius: 10,
        marginTop: 10,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    totalText: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: 'darkgreen',
    },
    totalNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'tomato',
    },
});

export default styles;
