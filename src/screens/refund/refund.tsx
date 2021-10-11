import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import FocusedStatusBar from '../../components/statusBar';
import {TermsScreenProps} from '../../navigation/homeScreenStackNavigator/types';
import {colors} from '../../utilities';

let data = [
  {
    feild_title: 'REFUND POLICY',
    // main_Description:
    //   'You must accept these terms and conditions when you use Adda Food Application:',
    ordered_concerns: [
      {
        feild_title: 'For Customer:',
        description: `In case of payment did by mistake or in case of any payment related issue from Google Play Store, we are not entitled to refund any amount. If it is very crucial and any genuine problem is seen in our system than we can look into it and resolve the issue or issue refund.`,
      },
      {
        feild_title: 'For orders from Restaurant:',
        description: `Food Dhaba in not responsible for increase in amount of any of the item provided in menu list from specific restaurants. Amount per Item in Menu List is provided by Restaurants and may vary from time to time.`,
      },
    ],
    un_ordered_concerns: [
      {
        feild_title: 'Order Approval:',
        description: `Food Dhaba may approve or cancel order. Delivery time may vary based on specific restaurants preparation time and location. Delivery charge and Food GST charges will be applied per order.`,
      },
      {
        feild_title: 'Blocking or Deleting your Account:',
        description: `If we notice any illegal activity then we have all the rights to permanently block your account without any notice and reasons.`,
      },
    ],
    // special_delclaration: `In case of any illegal activities from user, we can block their account permanently.`,
  },
];
const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  mainDescription: {
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  concernContainer: {
    marginVertical: 10,
  },
  concernedTitle: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  concernsDescription: {
    fontSize: 14,
    fontStyle: 'italic',
    marginVertical: 5,
    textAlign: 'justify',
  },
});

type concerns = {
  feild_title: string;
  description: string;
};

type RenderViewProps = {
  feild_title: string;
  main_Description?: string;
  ordered_concerns: Array<concerns>;
  un_ordered_concerns: Array<concerns>;
  special_delclaration?: string;
};

const ConcernsView = ({feild_title, description}: concerns) => {
  return (
    <View style={styles.concernContainer}>
      <Text style={styles.concernedTitle}>{feild_title}</Text>
      <View>
        <Text style={styles.concernsDescription}>{description}</Text>
      </View>
    </View>
  );
};

const RenderView = ({
  feild_title,
  main_Description,
  ordered_concerns,
  un_ordered_concerns,
  special_delclaration,
}: RenderViewProps) => {
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>{feild_title}</Text>
            {main_Description && (
              <Text style={styles.mainDescription}>{`* ${
                main_Description ?? ''
              }`}</Text>
            )}
          </>
        )}
        data={ordered_concerns}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => <ConcernsView {...item} />}
        ListFooterComponent={() => (
          <FlatList
            data={un_ordered_concerns}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({item, index}) => <ConcernsView {...item} />}
            ListFooterComponent={() =>
              special_delclaration ? (
                <Text style={styles.mainDescription}>
                  {`* ${special_delclaration ?? ''}`}
                </Text>
              ) : null
            }
          />
        )}
      />
    </View>
  );
};

export default function RefundScreen({navigation, route}: TermsScreenProps) {
  return (
    <>
      <FocusedStatusBar
        backgroundColor="#D17755"
        barStyle="light-content"
        translucent={true}
      />
      <View style={styles.root}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => <RenderView {...item} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}
