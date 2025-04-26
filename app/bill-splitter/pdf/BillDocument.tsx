import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    billSection: { color: 'black', textAlign: 'center', margin: 20 },
    tennentSection: { color: 'white', textAlign: 'left', marginHorizontal: 100 },
    evenLine: {backgroundColor: 'gray', paddingHorizontal: 25, paddingVertical: 5},
    oddLine: {color: 'black', backgroundColor: 'lightgray', paddingHorizontal: 25, paddingVertical: 5}
  });

const BillDocument = ({data}: any) => {
  const {bill, tennentList} = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.billSection}>
          <Text>{bill.amount} split between {tennentList.length} people.</Text>
        </View>
        <View style={styles.tennentSection}>
          {tennentList.map((tennent: { name: string; bill: number; }, key: number) => {
            return (
              <Text key={key} style={(key % 2) ? styles.oddLine : styles.evenLine }>
                {tennent.name}: ${tennent.bill}
              </Text>
            );
          })}
        </View>
        
      </Page>
    </Document>
  )
};

export default BillDocument;