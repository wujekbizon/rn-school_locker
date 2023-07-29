import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  View,
} from 'react-native';

import type {Locker} from './types/locker';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [locker, setLocker] = useState<Locker | null>(null);

  const fetchLockersServer = async () => {
    const response = await fetch(
      'http://3.127.37.237:5100/api/v1/lockers/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'greg@greg.com',
          password: 'Password1234!',
        }),
      },
    );
    if (response.ok) {
      const {locker, message} = await response.json();
      setLocker(locker);
    }
  };

  useEffect(() => {
    fetchLockersServer();
  }, [fetchLockersServer]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text>Hello {locker?.student}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
