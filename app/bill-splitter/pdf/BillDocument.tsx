import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    billSection: { color: 'black', textAlign: 'center', margin: 20 },
    tennentSection: { color: 'white', textAlign: 'left', marginHorizontal: 100, },
    evenLine: {backgroundColor: 'gray', paddingHorizontal: 25, paddingVertical: 5, flexDirection: 'row'},
    oddLine: {color: 'black', backgroundColor: 'lightgray', paddingHorizontal: 25, paddingVertical: 5, flexDirection: 'row'},
    tennentName: {fontWeight: 'bold', textAlign: 'left'},
    tennentDates: {paddingHorizontal: 10, width: '75%'},
    tennentBill: {paddingHorizontal: 10, textAlign: 'right'}
  });

const formatPayment = (payment: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      payment,
    );
  };

const BillDocument = ({data}: any) => {
  const {bill, tennentList} = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.billSection}>
          <Text>{formatPayment(bill.amount)} split between {tennentList.length} people.</Text>
        </View>
        <View style={styles.tennentSection}>
          {tennentList.map((tennent: { name: string; bill: number; startDate: Date; endDate: Date;}, key: number) => {
            return (
              <View  key={key} style={(key % 2) ? styles.oddLine : styles.evenLine }>
                <Text style={styles.tennentName}>{tennent.name}</Text>
                <Text style={styles.tennentDates}>{new Intl.DateTimeFormat("en-US").format(tennent.startDate)}-{new Intl.DateTimeFormat("en-US").format(tennent.endDate)}</Text>
                <Text style={styles.tennentBill}>{formatPayment(tennent.bill)}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  )
};

export default BillDocument;