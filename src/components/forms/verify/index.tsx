import * as React from 'react';
import {StyleSheet, View, TextInputProps, TextInput, Text} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {colors} from '../../../utilities';

type props = {
  value: string;
  setValue: React.Dispatch<string>;
};
const VerifyForm: React.FC<props> = ({value, setValue}) => {
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const CustomTextInput = React.forwardRef(
    (props: TextInputProps, ref: any) => (
      <View
        style={{
          height: 50,
          width: 50,
          borderColor: colors.brown,
          borderWidth: 1,
        }}>
        <TextInput
          ref={ref}
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType="phone-pad"
        />
      </View>
    ),
  );

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </View>
  );
};

export default VerifyForm;

const styles = StyleSheet.create({
  root: {width: '100%', alignItems: 'center'},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderBottomColor: colors.brown,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 50,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
