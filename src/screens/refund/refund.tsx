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
        feild_title: 'For Restaurant Owner:',
        description: `In case of payment did by mistake or in case of any payment related issues from Google Play Store or App Store, we are not entitled to refund any amount. If it is very crucial and any genuine problem is seen in our system than we can look into it and resolve the issue or issue refund.`,
      },
      {
        feild_title: 'For Customer of Restaurant:',
        description: `In case of payment did by mistake or in case of any payment related issues for food ordered with Food Dhaba, we are not entitled to refund any amount. Restaurant Owner will be responsible for issue refund to customer for placed order in any case.`,
      },
    ],
    un_ordered_concerns: [
      {
        feild_title: 'Order Approval:',
        description: `Food Dhaba is not responsible for any kind of order cancelation or approval. Delivery time, Taxes, Delivery Charges and Delivery times are decided by the restaurant owner. Restaurant owners are only responsible for any kind of updates and changes of extra charges. Food Dhaba is not taking any kind of taxes or extra charges from the customers.`,
      },
      {
        feild_title: 'Communication Problems between Customer and Restaurant:',
        description: `In case of misbehaviour, miscommunication or any illegal activities done by customer and restaurant registered here, we will not be responsible for any such activities, as we are not taking any proof of their identity.`,
      },
      {
        feild_title: 'Blocking or Deleting your Account:',
        description: `If we notice any illegal activity then we have all rights to permanently Block your account without any notice and reasons.`,
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
        backgroundColor="#FFF"
        barStyle="dark-content"
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
