/**
 * Spend-na v9.0 — Production Build
 * © 2026 Sandeep Hakki · hakki.in · All rights reserved
 * A product of Hakki Consulting
 *
 * "He is TRUSTING us — not working on our mistakes."
 *
 * Features: Onboarding · Roles · AsyncStorage · Responsive UI
 * ErrorBoundary · Input Sanitization · Smart Icons · Backup/Restore
 * Weekly Chart · My Month · Sound · Notifications · Settings+Help
 */

import React, { useState, useEffect, useRef, useCallback, Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  TextInput, Alert, Animated, Platform, StatusBar,
  Image, Linking, Keyboard, KeyboardAvoidingView,
  Share, useWindowDimensions, BackHandler,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { types as DPTypes } from 'react-native-document-picker';

// ── Bird Assets (Hakki Hummingbird © Sandeep Hakki) ─────────
const BIRD_32 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAGJUlEQVR42u1We2xUVR7+zjn33nnczrRDZzpl+gBKX7ROCkWkD2kRbBBJFaKIiKMri2hReSwJRBdD2LgElKipomKiQUkUIyKKUkUJJevCIpZSgW6LpQUKlJnKlHam87z3Hv+Yltgt0LKvv/j+uSf3PH6P7/ud3wFu4RaGCTk1VXDNrq1ZeN+hegI6aJ4QAYQI191PGAOhbND/6+4glIJrGuTbp4+0TnUtH5NvGNm09ctNgfaLHRwaDJ/W1qoHD7wTeW3tdjAGrioDD6AMBADXNAAAV9Vr2qHXdzk2JY3NGWuoenzV6R+7Wo4ceHXfydbtjY6kaalGt7+Xej0XqSCCUIrc9MVFuemLi/rSAWgquKYC4AA4xq9ZPy//6RVloAxElIaRc0IAAEyOp+l7mpvH7OgMGpKzZfvDa1wzy2t/stEs+ffLHyw9cXxuWVPzVcrGT3dYih5yCkxPGJNIxee1NcXV7z5/U7wTFuMsftb8guw6zhOnPVGS9U0Pt9z/bAUAJDonmCZv2OwqWP5CpWwaKel1NkYA2BdueibvU43f+VKAP/Fgff3y+ReaEy25cdPzP9jkmL+xSlyysmJoCvr5IwS+b3c0qOfbf6UjHPbeU3/bps8snChYkgRb2Yw781cv+TDn2VVfRqk/Ggp3qjbXS4sss1a+aWsj6DqxezOUSKcsJ2aCEH6i/a31oVLnXdJTq/deDXLoLAjgqgL7M5ueYjDbFdHnodygh0VOMVGSYDUHG5XecPTIn5e+aZm1ZOrIhZv321oB9w9b/nRqz7LXJWIglIkkGPaqXFMBnQimk6nac0W7sQOEAJQCfeqVnVOsiTOXbext++FjKTmzgKQlZ02szZlbW1Pp8PEz4fhpjxaOXrqtznjU23Pui2XT3Z79xxWvJ4xw9HdHUnCuDTDzL4VJAMZixjkHOAcVRAhyAo12ng8KckKQSUaZAFRIzZjkrqn+Q5f34AXz3a7CzKoP6yKffbKuacdj81AwYdR411ctVrcpzIO+xkCkIwiOWEUQclXgA++BfqN9EYtJaTrznOcWGPKmPi4aLGPU7ss/+79/f32oft9x4/jyO7jb29besr1hxIzFJcnTlr999i9zcoLUFxiz9LPvkljepPZtzz8yJf6Fj+xj85zf/DRzASEMnKsxGwNDHgjDjLnZutJ75uvGlVbp7Tl2/stJD5Hizcxk1wuCiO5d1UsDR3btBicqhSgZc0rKA01//94yae48W2r5oss1760Q0zwhc0FW6i+vfLBT0UKKP3A2FDPFBzPdPxCznea4tW/vJoXFZYRRkIAKet4T0kUpJRAkRFSFqDRksFjj2leU2CKt9V1x48qzmcEiyOkTixXPuZZA1+mzUm6xMyWn4q8dX62u6Dh64OKQIu8fmB6tqlR6uk8rPx85Q1PSR+gqXYv1UypfpJAheK5EqEbBdBbpyhtVRf4D2+vM48rzDA5njmhOy2BMR/TWzEk6oyOX+QO97ftefrLj5EcNhDCAc3BoQztwLehyC0zyH1etlUpmr5RCIvxvrZ4TqNm6x1I4u1gwWOMp1RvBdCIB52rU3x2h4VBe0FF29PDL63qiXgWcg3N+wwywASLsrwBCAUKgdl6KBL/buZe723ZJheUP62yZadGWY/tJVAnrE0fnUoMpgVqT04kj/TYhJeM2TqjWenhLda+vI8y5NkhwN25G/RWgaYDW96UUoBS9X3/ccHlZxWhDQspkxwMbqsOX2rwJsnNK8oipLjN3lBp7NBkdF9u0S2cuhPyXQpoWHf51P7yeIIKrURgdefF3VP3DG26s29l2cOOaOLszLS5pQmlEiig9XccPeU/t/THY0eiPtWD+332QECYCAEZlPzb5kac5r5zd2pyVsaiIDi+GYWhgKHANhDB0X264kGq6t9xqzL89K+O+RaFo6Fin91AzpTpwqDftAL2pLICAg6P93CcbBIVr4R4lFA163VxTwTVlWKIb9pPsmkno4/XXrsPHoBBKAL3He/BkbFb7tygQbm55zIFg2O0H15Qrvn+e6PY1+QAyqMv9TyjoLxpRMEuiSIVjp9ct0LgCQij+LyAkptlRyfePm5C11tXf42/hFv4T/Aa3+no3gZWC0AAAAABJRU5ErkJggg==';
const BIRD_96 = 'data:image/png;base64,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';

// ── Responsive System ────────────────────────────────────────
// Call inside components with useWindowDimensions()
const getLayout = (w: number) => ({
  isTablet: w >= 600,
  isLarge: w >= 430,
  col2: w >= 600 ? (w - 64) / 4 : (w - 46) / 2,
  px: w >= 600 ? 32 : 18,
  cardRadius: w >= 600 ? 22 : 16,
});

// ── Colors ───────────────────────────────────────────────────
const C = {
  nec:'#059669', necL:'#ecfdf5', necM:'#6ee7b7',
  com:'#7c3aed', comL:'#f5f3ff', comM:'#c4b5fd',
  cft:'#d97706', cftL:'#fffbeb', cftM:'#fcd34d',
  lux:'#e11d48', luxL:'#fff1f2', luxM:'#fda4af',
  brand:'#06b6d4', brandD:'#0e7490', brandL:'#ecfeff',
  dark:'#080e1d', dark2:'#111827', dark3:'#1f2937', darkB:'#374151',
  bg:'#f1f5f9', card:'#ffffff', cardB:'#e2e8f0',
  t1:'#0f172a', t2:'#334155', t3:'#64748b', t4:'#94a3b8',
  white:'#ffffff', warning:'#f59e0b', danger:'#dc2626',
  success:'#10b981',
};

// ── Buckets ──────────────────────────────────────────────────
const B: any = {
  necessary:   {label:'Necessary',   color:C.nec, light:C.necL, mid:C.necM, shape:'⌂', tag:'Food · Rent · Medicine',         defaultLimit:15000},
  committed:   {label:'Committed',   color:C.com, light:C.comL, mid:C.comM, shape:'◈', tag:'EMI · SIP · Insurance · Fees',   defaultLimit:30000},
  comfortable: {label:'Comfortable', color:C.cft, light:C.cftL, mid:C.cftM, shape:'◎', tag:'Lifestyle · Dining · Transport', defaultLimit:10000},
  luxury:      {label:'Luxury',      color:C.lux, light:C.luxL, mid:C.luxM, shape:'◆', tag:'Splurge · Wants · Lavish',       defaultLimit:5000},
};

// ── Roles ────────────────────────────────────────────────────
const ROLES: any = {
  student:      {label:'Student',              icon:'[S]', limits:{necessary:3000,committed:0,comfortable:2000,luxury:1000},      nudge:(n:string)=>`Hey ${n}! Quick sort before class `},
  home_manager: {label:'Home Manager',         icon:'[H]', limits:{necessary:15000,committed:10000,comfortable:5000,luxury:2000}, nudge:(n:string)=>`Good morning ${n}! Yesterday's spends waiting `},
  working:      {label:'Working Professional', icon:'[W]', limits:{necessary:15000,committed:30000,comfortable:10000,luxury:5000},nudge:(n:string)=>`Morning ${n}! 2 mins to sort last night's spends `},
  business:     {label:'Business Owner',       icon:'[B]', limits:{necessary:20000,committed:20000,comfortable:15000,luxury:10000},nudge:(n:string)=>`New day ${n}! Know where the money went `},
  retired:      {label:'Retired',              icon:'[R]', limits:{necessary:10000,committed:5000,comfortable:5000,luxury:2000},  nudge:(n:string)=>`Good morning ${n}! Your daily check-in `},
};

// ── Merchant Icons ───────────────────────────────────────────
// Generic category icons — Unicode only, no brand names, renders on ALL devices
const CATEGORY_RULES: Array<{keywords: string[], icon: string}> = [
  {keywords:['food','meal','lunch','dinner','breakfast','restaurant','cafe','canteen',
    'hotel','pizza','burger','chicken','mutton','veg','tiffin','dabba','mess','dhaba',
    'bakery','sweets','mithai','snack','delivery','order','takeaway','parcel','catering'],
    icon:'◉'},
  {keywords:['grocery','groceries','vegetable','fruit','milk','dairy','kirana',
    'supermarket','mart','bazaar','market','store','fresh','organic','provisions'],
    icon:'▦'},
  {keywords:['cab','taxi','ride','auto','rickshaw','bus','train','metro','travel',
    'transport','fuel','petrol','diesel','cng','parking','toll','flight','air','ticket'],
    icon:'▷'},
  {keywords:['medical','medicine','pharmacy','hospital','clinic','doctor','health',
    'chemist','drug','lab','test','scan','dental','eye','nursing','surgical'],
    icon:'+'},
  {keywords:['shopping','clothes','shirt','pant','shoes','dress','saree','kurta',
    'fashion','garment','tailor','jewel','gold','silver','watch','bag','accessory'],
    icon:'◈'},
  {keywords:['electricity','power','water','gas','bill','utility','recharge','mobile',
    'broadband','internet','wifi','dth','cable','telephone','landline'],
    icon:'◆'},
  {keywords:['school','college','university','tuition','coaching','course','class',
    'fees','exam','book','stationery','education','library','hostel','admission'],
    icon:'▣'},
  {keywords:['movie','cinema','theatre','show','event','concert','game','sport',
    'club','party','outing','fun','subscription','streaming','entertainment'],
    icon:'◎'},
  {keywords:['emi','loan','insurance','premium','lic','policy','sip','mutual',
    'investment','fd','rd','interest','bank','finance','credit','repay','installment'],
    icon:'⬡'},
  {keywords:['rent','maintenance','society','flat','house','room','pg',
    'accommodation','deposit','lease','property'],
    icon:'⌂'},
  {keywords:['salary','income','bonus','stipend','pocket','allowance',
    'received','credited','transfer'],
    icon:'↓'},
  {keywords:['salon','spa','parlour','haircut','beauty','gym','fitness',
    'yoga','wellness','massage'],
    icon:'◑'},
  {keywords:['petrol','fuel','diesel','cng','oil','pump','bpcl','hp','shell'],
    icon:'⊕'},
];

const getMerchantIcon = (merchant: string): string | null => {
  if (!merchant) return null;
  const lower = merchant.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some(k => lower.includes(k))) return rule.icon;
  }
  return null;
};

// ── Storage Keys ─────────────────────────────────────────────
const KEYS = {
  profile:      'user_profile_v2',
  transactions: 'transactions_v2',
  limits:       'limits_v2',
  settings:     'app_settings_v2',
  onboarded:    'onboarding_done_v2',
  backup:       'last_auto_backup',
};

// ── Defaults ─────────────────────────────────────────────────
const DEFAULT_LIMITS   = {necessary:15000, committed:30000, comfortable:10000, luxury:5000};
const DEFAULT_SETTINGS = {soundEnabled:true, notifEnabled:true, notifHour:8, notifMinute:0};
const DEFAULT_PROFILE  = {name:'', dob:'', city:'', role:'working', photo:null, quote:''};

// ── Input Sanitizers ─────────────────────────────────────────
const S = {
  name:   (v:string) => v.replace(/[^a-zA-Z\s.\-']/g, '').slice(0, 50),
  amount: (v:string) => {
    const clean = v.replace(/[^0-9.]/g, '');
    const parts = clean.split('.');
    if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
    return clean.slice(0, 10);
  },
  text:   (v:string) => v.replace(/[<>{}[\]\\]/g, '').slice(0, 120),
  city:   (v:string) => v.replace(/[^a-zA-Z\s\-]/g, '').slice(0, 40),
  dob:    (v:string) => v.replace(/[^0-9/]/g, '').slice(0, 10),
  quote:  (v:string) => v.replace(/[<>{}[\]\\]/g, '').slice(0, 100),
  search: (v:string) => v.replace(/[<>{}[\]\\]/g, '').slice(0, 60),
};

// ── Safe Storage Wrappers ────────────────────────────────────
const store = {
  get: async (key:string): Promise<any> => {
    try {
      const v = await AsyncStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch { return null; }
  },
  set: async (key:string, value:any): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch { return false; }
  },
  remove: async (key:string): Promise<void> => {
    try { await AsyncStorage.removeItem(key); } catch {}
  },
  clear: async (): Promise<void> => {
    try { for (const key of Object.values(KEYS)) { await AsyncStorage.removeItem(key); } } catch {}
  },
};

// ── Transaction Validator ────────────────────────────────────
const validateTransaction = (t: any): any | null => {
  try {
    if (!t || typeof t !== 'object') return null;
    const amount = parseFloat(t.amount);
    if (isNaN(amount) || amount <= 0) return null;
    return {
      id:       String(t.id || Date.now()),
      merchant: String(t.merchant || 'Unknown').slice(0, 80),
      amount:   amount,
      time:     String(t.time || '--:--').slice(0, 10),
      date:     String(t.date || '--').slice(0, 20),
      month:    String(t.month || 'Unknown'),
      bucket:   (t.bucket && B[t.bucket]) ? t.bucket : null,
      source:   ['sms','manual'].includes(t.source) ? t.source : 'manual',
      sms:      t.sms ? String(t.sms).slice(0, 200) : undefined,
    };
  } catch { return null; }
};

// ── Backup / Restore ─────────────────────────────────────────
const createBackupPayload = (transactions:any[], profile:any, limits:any) => ({
  version: 2,
  exportedAt: new Date().toISOString(),
  app: 'Spend-na',
  author: '© Sandeep Hakki · hakki.in',
  profile: { name: profile?.name, city: profile?.city, role: profile?.role },
  limits,
  transactions,
});

const mergeTransactions = (existing: any[], imported: any[]): any[] => {
  const map = new Map<string, any>();
  // existing first — then imported fills gaps, deduplicates by id
  [...existing, ...imported].forEach(t => {
    const valid = validateTransaction(t);
    if (valid && !map.has(valid.id)) map.set(valid.id, valid);
  });
  return Array.from(map.values());
};

// ── Summary Calculator ───────────────────────────────────────
const calcSummary = (transactions: any[]) => {
  const s: any = {total:0, necessary:0, committed:0, comfortable:0, luxury:0};
  transactions.forEach((t:any) => {
    if (t.bucket && B[t.bucket]) {
      s[t.bucket] = (s[t.bucket]||0) + t.amount;
      s.total += t.amount;
    }
  });
  return s;
};

// ── Mock Data (2 records only) ───────────────────────────────
const MOCK_TRANSACTIONS: any[] = [
  {id:'mock_1', merchant:'Food Delivery', amount:340, time:'08:30', date:'12 Mar', month:'Mar 2026', bucket:null, source:'sms', sms:'Rs.340 debited from XX4321 for food order on 12-Mar-2026'},
  {id:'mock_2', merchant:'Home Loan EMI', amount:24000, time:'01:00', date:'01 Mar', month:'Mar 2026', bucket:'committed', source:'sms', sms:'Rs.24000 debited for HOME LOAN EMI on 01-Mar-2026'},
];


// ═══════════════════════════════════════════════════════════
// ERROR BOUNDARY — catches any crash, saves data, recovers
// ═══════════════════════════════════════════════════════════
interface EBState { hasError: boolean; }
class ErrorBoundary extends Component<{children:any, onReset:()=>void}, EBState> {
  state: EBState = { hasError: false };

  static getDerivedStateFromError(): EBState { return { hasError: true }; }

  componentDidCatch(error: any) {
    // Silently try to save a crash backup before showing error screen
    AsyncStorage.getItem(KEYS.transactions).then(raw => {
      if (raw) {
        try {
          const data = JSON.parse(raw);
          const backup = { crashAt: new Date().toISOString(), transactions: data };
          AsyncStorage.setItem('crash_backup', JSON.stringify(backup));
        } catch {}
      }
    }).catch(() => {});
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{flex:1, backgroundColor:C.dark, alignItems:'center', justifyContent:'center', padding:32}}>
          <Image source={{uri:BIRD_96}} style={{width:80, height:80, opacity:0.6, marginBottom:20}} resizeMode="contain"/>
          <Text style={{fontSize:22, fontWeight:'800', color:C.white, marginBottom:8, textAlign:'center'}}>Something went wrong</Text>
          <Text style={{fontSize:14, color:C.t4, textAlign:'center', lineHeight:22, marginBottom:32}}>
            Your data has been saved.{'\n'}You can restart or clear and start fresh.
          </Text>
          <TouchableOpacity
            style={{backgroundColor:C.brand, paddingHorizontal:32, paddingVertical:14, borderRadius:16, marginBottom:12, width:'100%', alignItems:'center'}}
            onPress={() => { this.setState({hasError:false}); this.props.onReset(); }}>
            <Text style={{fontSize:16, fontWeight:'800', color:C.dark}}>Restart App</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderWidth:1.5, borderColor:C.danger, paddingHorizontal:32, paddingVertical:14, borderRadius:16, width:'100%', alignItems:'center'}}
            onPress={() => {
              Alert.alert(
                'Clear all data?',
                'This cannot be undone. Your crash backup is still saved on this phone.',
                [
                  {text:'Cancel', style:'cancel'},
                  {text:'Clear & Restart', style:'destructive', onPress: async () => {
                    await store.clear();
                    this.setState({hasError:false});
                    this.props.onReset();
                  }},
                ]
              );
            }}>
            <Text style={{fontSize:14, fontWeight:'700', color:C.danger}}>Clear Data & Start Fresh</Text>
          </TouchableOpacity>
          <Text style={{fontSize:10, color:C.t4, marginTop:24, textAlign:'center'}}>© Sandeep Hakki · hakki.in · 2026</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════
const BucketIcon = ({bucket, size=40, style}: any) => {
  const cfg = B[bucket];
  if (!cfg) return null;
  return (
    <View style={[{width:size, height:size, borderRadius:size*0.28, backgroundColor:cfg.light,
      alignItems:'center', justifyContent:'center', borderWidth:1.5, borderColor:cfg.mid}, style]}>
      <Text style={{fontSize:size*0.38, color:cfg.color, fontWeight:'900'}}>{cfg.shape}</Text>
    </View>
  );
};

const MerchantIcon = ({merchant, bucket, size=38}: any) => {
  const emoji = getMerchantIcon(merchant || '');
  if (emoji) {
    return (
      <View style={{width:size, height:size, borderRadius:size*0.28, backgroundColor:C.bg,
        alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:C.cardB}}>
        <Text style={{fontSize:size*0.52}}>{emoji}</Text>
      </View>
    );
  }
  if (bucket && B[bucket]) return <BucketIcon bucket={bucket} size={size}/>;
  // Fallback — Hakki hummingbird only when truly nothing found
  return (
    <View style={{width:size, height:size, borderRadius:size*0.28, backgroundColor:C.dark2,
      alignItems:'center', justifyContent:'center', borderWidth:1, borderColor:C.darkB}}>
      <Image source={{uri:BIRD_32}} style={{width:size*0.76, height:size*0.76}} resizeMode="contain"/>
    </View>
  );
};

const UserAvatar = ({profile, size=44}: any) => {
  const firstName = profile?.name?.[0]?.toUpperCase() || 'S';
  if (profile?.photo) {
    return (
      <Image source={{uri:profile.photo}}
        style={{width:size, height:size, borderRadius:size*0.28, borderWidth:2, borderColor:C.brand}}
        resizeMode="cover"/>
    );
  }
  return (
    <View style={{width:size, height:size, borderRadius:size*0.28, backgroundColor:C.brand,
      alignItems:'center', justifyContent:'center', borderWidth:2, borderColor:C.brandD}}>
      <Text style={{fontSize:size*0.42, fontWeight:'800', color:C.white}}>{firstName}</Text>
    </View>
  );
};

const ScreenHeader = ({title, subtitle, right, onBack, noBorder}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  return (
    <View style={{backgroundColor:C.card,
      paddingTop: insets.top + 8,
      paddingBottom: 12,
      paddingLeft: Math.max(L.px, insets.left + 16),
      paddingRight: Math.max(L.px, insets.right + 16),
      flexDirection:'row', alignItems:'center',
      borderBottomWidth: noBorder ? 0 : 1, borderBottomColor:C.cardB}}>
      {onBack
        ? <TouchableOpacity onPress={onBack} hitSlop={{top:10,bottom:10,left:10,right:10}} style={{width:70}}>
            <Text style={{fontSize:15, color:C.brand, fontWeight:'600'}}>← Back</Text>
          </TouchableOpacity>
        : <View style={{width:70}}/>
      }
      <View style={{flex:1, alignItems:'center'}}>
        <Text style={{fontSize:17, fontWeight:'800', color:C.t1}} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={{fontSize:11, color:C.t4, marginTop:1}}>{subtitle}</Text> : null}
      </View>
      <View style={{width:70, alignItems:'flex-end'}}>{right || null}</View>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════
const OnboardingScreen = ({onDone}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const [name, setName]   = useState('');
  const [dob, setDob]     = useState('');
  const [city, setCity]   = useState('');
  const [role, setRole]   = useState('');
  const [photo, setPhoto] = useState<string|null>(null);
  const [quote, setQuote] = useState('');
  const canProceed = name.trim().length > 1 && role.length > 0;

  const pickPhoto = () => {
    launchImageLibrary({mediaType:'photo', quality:0.7, selectionLimit:1}, (res) => {
      try {
        if (!res.didCancel && !res.errorCode && res.assets?.[0]?.uri) {
          setPhoto(res.assets[0].uri!);
        }
      } catch {}
    });
  };

  const handleStart = async () => {
    if (!canProceed) return;
    Keyboard.dismiss();
    const roleData = ROLES[role];
    const firstName = name.trim().split(' ')[0];
    const profile = {
      name: name.trim(), dob: dob.trim(), city: city.trim(),
      role, photo, quote: quote.trim() || roleData.nudge(firstName),
    };
    const limits = roleData.limits;
    await store.set(KEYS.profile, profile);
    await store.set(KEYS.limits, limits);
    await store.set(KEYS.settings, DEFAULT_SETTINGS);
    await store.set(KEYS.transactions, MOCK_TRANSACTIONS);
    await store.set(KEYS.onboarded, true);
    onDone(profile, limits, MOCK_TRANSACTIONS);
  };

  const maxW = L.isTablet ? 520 : width;

  return (
    <View style={{flex:1, backgroundColor:C.dark}}>
      <StatusBar barStyle="light-content"/>
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>
        <ScrollView
          style={{flex:1}}
          contentContainerStyle={{
            paddingTop: insets.top + 24,
            paddingBottom: insets.bottom + 40,
            paddingLeft: Math.max(L.px, insets.left + L.px),
            paddingRight: Math.max(L.px, insets.right + L.px),
            alignItems: L.isTablet ? 'center' : 'stretch',
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          <View style={{width:'100%', maxWidth: maxW}}>
            {/* Brand header */}
            <View style={{alignItems:'center', marginBottom:28}}>
              <Image source={{uri:BIRD_96}} style={{width:72, height:72}} resizeMode="contain"/>
              <Text style={{fontSize:34, fontWeight:'900', color:C.brand, letterSpacing:-1, marginTop:10}}>Spend-na</Text>
              <Text style={{fontSize:13, color:C.t4, marginTop:4}}>Your money mirror. Let's set you up.</Text>
            </View>

            {/* Photo picker */}
            <TouchableOpacity style={{alignSelf:'center', marginBottom:22}} onPress={pickPhoto}>
              <View style={{width:90, height:90, borderRadius:28, backgroundColor:C.dark2,
                alignItems:'center', justifyContent:'center',
                borderWidth:2, borderColor: photo ? C.brand : C.darkB,
                borderStyle: photo ? 'solid' : 'dashed', overflow:'hidden'}}>
                {photo
                  ? <Image source={{uri:photo}} style={{width:90, height:90}} resizeMode="cover"/>
                  : <><Text style={{fontSize:26, color:C.t4, marginBottom:4}}>◉</Text><Text style={{fontSize:10, color:C.t4}}>Add photo</Text></>
                }
              </View>
              {photo && (
                <View style={{position:'absolute', bottom:-4, right:-4, width:24, height:24,
                  borderRadius:12, backgroundColor:C.success, alignItems:'center', justifyContent:'center'}}>
                  <Text style={{color:C.white, fontSize:12}}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Fields */}
            {[
              {label:'YOUR NAME *',  key:'name',  value:name,  setter:(v:string)=>setName(S.name(v)),  placeholder:"What should we call you?",     keyboard:'default'},
              {label:'DATE OF BIRTH',key:'dob',   value:dob,   setter:(v:string)=>setDob(S.dob(v)),    placeholder:"DD/MM/YYYY",                   keyboard:'numbers-and-punctuation'},
              {label:'YOUR CITY',    key:'city',  value:city,  setter:(v:string)=>setCity(S.city(v)),  placeholder:"Your city",   keyboard:'default'},
            ].map(f => (
              <View key={f.key}>
                <Text style={OB.label}>{f.label}</Text>
                <TextInput style={OB.input}
                  placeholder={f.placeholder} placeholderTextColor={C.t4}
                  value={f.value} onChangeText={f.setter}
                  autoCapitalize="words" keyboardType={f.keyboard as any}
                  returnKeyType="next"/>
              </View>
            ))}

            {/* Role picker */}
            <Text style={OB.label}>I AM A... *</Text>
            <View style={{gap:8, marginBottom:22}}>
              {Object.entries(ROLES).map(([key, r]:any) => (
                <TouchableOpacity key={key}
                  style={[OB.roleBtn, role===key && {backgroundColor:C.brand, borderColor:C.brand}]}
                  onPress={()=>setRole(key)}>
                  <Text style={{fontSize:16,color:C.t4}}>{r.icon}</Text>
                  <Text style={[OB.roleTxt, role===key && {color:C.dark, fontWeight:'800'}]}>{r.label}</Text>
                  {role===key && (
                    <View style={{marginLeft:'auto', width:22, height:22, borderRadius:11,
                      backgroundColor:C.dark, alignItems:'center', justifyContent:'center'}}>
                      <Text style={{color:C.brand, fontSize:12, fontWeight:'900'}}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom quote */}
            <Text style={OB.label}>YOUR DAILY QUOTE (optional)</Text>
            <TextInput style={[OB.input, {height:72}]}
              placeholder="Something that motivates you..."
              placeholderTextColor={C.t4}
              value={quote} onChangeText={(v)=>setQuote(S.quote(v))}
              multiline returnKeyType="done"/>

            {/* CTA */}
            <TouchableOpacity
              style={[OB.cta, !canProceed && {opacity:0.35}]}
              onPress={handleStart} disabled={!canProceed}>
              <Text style={OB.ctaTxt}>Start my journey  →</Text>
            </TouchableOpacity>

            <Text style={{fontSize:10, color:C.t4, textAlign:'center', marginTop:16, lineHeight:17}}>
              All your data stays only on this phone.{'\n'}No server. No cloud. No tracking.{'\n'}© Sandeep Hakki · hakki.in · 2026
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const OB = StyleSheet.create({
  label:   {fontSize:10, color:C.t4, letterSpacing:2, fontWeight:'700', marginBottom:8},
  input:   {backgroundColor:C.dark2, borderRadius:14, paddingHorizontal:14, paddingVertical:13,
            fontSize:15, color:C.white, borderWidth:1.5, borderColor:C.darkB, marginBottom:18},
  roleBtn: {flexDirection:'row', alignItems:'center', gap:12, backgroundColor:C.dark2,
            borderRadius:14, padding:14, borderWidth:1.5, borderColor:C.darkB},
  roleTxt: {fontSize:14, color:C.white, fontWeight:'600'},
  cta:     {backgroundColor:C.brand, borderRadius:18, paddingVertical:16, alignItems:'center', marginTop:8},
  ctaTxt:  {fontSize:16, fontWeight:'800', color:C.dark},
});


// ═══════════════════════════════════════════════════════════
// HOME SCREEN
// ═══════════════════════════════════════════════════════════
const HomeScreen = ({nav, summary, transactions, limits, profile}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const pending = transactions.filter((t:any)=>!t.bucket).length;
  const hour = new Date().getHours();
  const greeting = hour<12 ? 'Good Morning' : hour<17 ? 'Good Afternoon' : 'Good Evening';
  const firstName = profile?.name?.split(' ')[0] || 'Friend';
  const roleInfo = ROLES[profile?.role] || ROLES.working;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    Animated.timing(fade, {toValue:1, duration:450, useNativeDriver:true}).start();
  },[]);

  const bucketEntries = Object.entries(B);

  return (
    <View style={{flex:1, backgroundColor:C.dark}}>
      <StatusBar barStyle="light-content" backgroundColor={C.dark}/>
      <ScrollView
        style={{flex:1}}
        contentContainerStyle={{paddingBottom: insets.bottom + 80}}
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEnabled={true}
        nestedScrollEnabled={true}>
        <Animated.View style={{opacity:fade}}>

          {/* Hero Section */}
          <View style={{
            backgroundColor:C.dark,
            paddingTop: insets.top + 10,
            paddingLeft: Math.max(L.px, insets.left + L.px),
            paddingRight: Math.max(L.px, insets.right + L.px),
            paddingBottom: 28,
          }}>
            {/* Top row: greeting + settings */}
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:12, color:C.t4, marginBottom:2}}>{greeting}</Text>
                <Text style={{fontSize:28, fontWeight:'800', color:C.white, letterSpacing:-0.5}}>{firstName}</Text>
                <Text style={{fontSize:11, color:C.brand, fontWeight:'600', marginTop:2}}>
                  {roleInfo.icon}  {roleInfo.label}
                </Text>
              </View>
              <TouchableOpacity
                style={{width:44, height:44, borderRadius:22, backgroundColor:'rgba(255,255,255,0.07)',
                  alignItems:'center', justifyContent:'center'}}
                onPress={()=>nav('Settings')}
                hitSlop={{top:8,bottom:8,left:8,right:8}}>
                <Text style={{fontSize:20, color:C.t3, fontWeight:'600', letterSpacing:-1}}>☰</Text>
              </TouchableOpacity>
            </View>

            {/* Quote card with user photo */}
            <View style={{backgroundColor:C.dark2, borderRadius:20, padding:16,
              flexDirection:'row', alignItems:'center', gap:14,
              marginBottom: summary.total > 0 ? 14 : 0,
              borderWidth:1, borderColor:C.darkB, overflow:'hidden'}}>
              <UserAvatar profile={profile} size={60}/>
              <View style={{flex:1}}>
                <View style={{width:24, height:3, backgroundColor:C.brand, borderRadius:2, marginBottom:8}}/>
                <Text style={{fontSize:12, color:'#cbd5e1', fontStyle:'italic', lineHeight:19}}>
                  {profile?.quote || 'Every rupee has a story.\nMake yours count today.'}
                </Text>
              </View>
              {/* Subtle Hakki watermark — 10% opacity, bottom right */}
              <Image source={{uri:BIRD_32}}
                style={{position:'absolute', bottom:8, right:8, width:20, height:20, opacity:0.10}}
                resizeMode="contain"/>
            </View>

            {/* Total strip */}
            {summary.total > 0 && (
              <View style={{backgroundColor:C.dark3, borderRadius:14, paddingHorizontal:16,
                paddingVertical:11, flexDirection:'row', justifyContent:'space-between',
                alignItems:'center', borderWidth:1, borderColor:C.darkB}}>
                <Text style={{fontSize:12, color:C.t4}}>Month Total</Text>
                <Text style={{fontSize:22, fontWeight:'800', color:C.brand}}>
                  ₹ {summary.total.toLocaleString('en-IN')}
                </Text>
              </View>
            )}
          </View>

          {/* Content area */}
          <View style={{
            backgroundColor:C.bg, borderTopLeftRadius:24, borderTopRightRadius:24,
            marginTop:-16,
            paddingLeft: Math.max(L.px, insets.left + L.px),
            paddingRight: Math.max(L.px, insets.right + L.px),
            paddingTop: 22, paddingBottom: 12,
          }}>

            {/* Pending banner */}
            {pending > 0 && (
              <TouchableOpacity
                style={{backgroundColor:C.lux, borderRadius:16, paddingHorizontal:14,
                  paddingVertical:12, flexDirection:'row', alignItems:'center', gap:10, marginBottom:20}}
                onPress={()=>nav('Sort')}>
                <View style={{width:8, height:8, borderRadius:4, backgroundColor:'rgba(255,255,255,0.55)'}}/>
                <View style={{flex:1}}>
                  <Text style={{fontSize:13, fontWeight:'700', color:C.white}}>
                    {pending} spend{pending>1?'s':''} waiting to be sorted
                  </Text>
                  <Text style={{fontSize:10, color:'rgba(255,255,255,0.6)', marginTop:1}}>
                    tap to classify
                  </Text>
                </View>
                <Text style={{fontSize:14, fontWeight:'700', color:C.white}}>Sort ›</Text>
              </TouchableOpacity>
            )}

            {/* Section label + limits link */}
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
              <Text style={{fontSize:10, color:C.t4, letterSpacing:2.5, fontWeight:'700'}}>THIS MONTH</Text>
              <TouchableOpacity onPress={()=>nav('Limits')}>
                <Text style={{fontSize:11, color:C.brand, fontWeight:'700'}}>Set Limits ›</Text>
              </TouchableOpacity>
            </View>

            {/* Bucket grid — 2 cols on phone, 4 cols on tablet */}
            <View style={{
              flexDirection:'row', flexWrap:'wrap',
              gap:10, marginBottom:18,
              justifyContent: L.isTablet ? 'flex-start' : 'space-between',
            }}>
              {bucketEntries.map(([key, cfg]:any) => {
                const amt = summary[key] || 0;
                const limit = limits[key] || 0;
                const isOver = limit > 0 && amt > limit;
                const isNear = limit > 0 && amt >= limit * 0.8 && !isOver;
                const pct = limit > 0 ? Math.min((amt/limit)*100, 100) : 0;
                const cardW = L.isTablet ? (width - L.px*2 - 30) / 4 : (width - L.px*2 - 10) / 2;
                return (
                  <TouchableOpacity key={key}
                    style={{width:cardW, backgroundColor:C.card, borderRadius:L.cardRadius,
                      padding:12, overflow:'hidden',
                      borderWidth:1.5, borderColor: isOver ? C.danger : C.cardB}}
                    onPress={()=>nav('MyMonth')}>
                    <View style={{height:4, borderRadius:2, marginBottom:10,
                      marginHorizontal:-12, marginTop:-12,
                      backgroundColor: isOver ? C.danger : cfg.color}}/>
                    <BucketIcon bucket={key} size={32} style={{marginBottom:6}}/>
                    <Text style={{fontSize:15, fontWeight:'800', marginBottom:2,
                      color: isOver ? C.danger : cfg.color}}>
                      {amt >= 1000 ? `₹${(amt/1000).toFixed(1)}k` : `₹${amt}`}
                    </Text>
                    <Text style={{fontSize:10, color:C.t3, fontWeight:'600'}}>{cfg.label}</Text>
                    {isOver && <Text style={{fontSize:8, color:C.danger, fontWeight:'800', marginTop:2}}>OVER LIMIT</Text>}
                    {isNear && <Text style={{fontSize:8, color:C.warning, fontWeight:'800', marginTop:2}}>NEAR LIMIT</Text>}
                    {limit > 0 && (
                      <View style={{marginTop:6, height:4, backgroundColor:cfg.light, borderRadius:2, overflow:'hidden'}}>
                        <View style={{height:4, width:`${pct}%`,
                          backgroundColor: isOver ? C.danger : isNear ? C.warning : cfg.color,
                          borderRadius:2}}/>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Action buttons */}
            <TouchableOpacity style={{backgroundColor:C.brand, borderRadius:16,
              paddingVertical:15, alignItems:'center', marginBottom:10}}
              onPress={()=>nav('Sort')}>
              <Text style={{fontSize:15, fontWeight:'700', color:C.dark}}>⊞  Scan Bank Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:C.card, borderRadius:16, paddingVertical:15,
              alignItems:'center', borderWidth:2, borderColor:C.brand, marginBottom:18}}
              onPress={()=>nav('ManualAdd')}>
              <Text style={{fontSize:15, fontWeight:'700', color:C.brand}}>+  Add Manually</Text>
            </TouchableOpacity>

            {/* Privacy footer */}
            <View style={{backgroundColor:C.card, borderRadius:14, padding:12,
              borderWidth:1, borderColor:C.cardB, alignItems:'center'}}>
              <Text style={{fontSize:11, color:C.t4}}>Your data never leaves this phone</Text>
              <TouchableOpacity onPress={()=>Linking.openURL('http://www.hakki.in').catch(()=>{})}>
                <Text style={{fontSize:9, color:C.brand, marginTop:4}}>© Sandeep Hakki · hakki.in · 2026</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// SORT SCREEN
// ═══════════════════════════════════════════════════════════
const SortScreen = ({nav, transactions, onClassify, onDelete, profile}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const unsorted = transactions.filter((t:any) => !t.bucket);

  if (unsorted.length === 0) {
    return (
      <View style={{flex:1, backgroundColor:C.bg, alignItems:'center', justifyContent:'center', padding:32}}>
        <View style={{width:90, height:90, borderRadius:26, backgroundColor:C.brandL,
          alignItems:'center', justifyContent:'center', marginBottom:20,
          borderWidth:2, borderColor:C.brand}}>
          <Text style={{fontSize:28, color:C.brand, fontWeight:'900'}}>✓</Text>
        </View>
        <Text style={{fontSize:26, fontWeight:'800', color:C.t1, marginBottom:8}}>All sorted!</Text>
        <Text style={{fontSize:14, color:C.t3, textAlign:'center', lineHeight:22, marginBottom:28}}>
          Nothing is pending.{'\n'}See where your money went this month.
        </Text>
        <TouchableOpacity
          style={{backgroundColor:C.brand, paddingHorizontal:32, paddingVertical:14, borderRadius:16}}
          onPress={()=>nav('MyMonth')}>
          <Text style={{fontSize:15, fontWeight:'700', color:C.dark}}>See My Month ›</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      {/* Header with user photo */}
      <View style={{backgroundColor:C.card,
        paddingTop: insets.top + 8, paddingBottom: 12,
        paddingLeft: Math.max(L.px, insets.left + L.px),
        paddingRight: Math.max(L.px, insets.right + L.px),
        flexDirection:'row', alignItems:'center', gap:10,
        borderBottomWidth:1, borderBottomColor:C.cardB}}>
        <UserAvatar profile={profile} size={36}/>
        <View style={{flex:1}}>
          <Text style={{fontSize:18, fontWeight:'800', color:C.t1}}>Sort Spends</Text>
          <Text style={{fontSize:11, color:C.t4}}>{unsorted.length} waiting</Text>
        </View>
        <View style={{width:36, height:36, borderRadius:18, backgroundColor:C.lux,
          alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:13, fontWeight:'800', color:C.white}}>{unsorted.length}</Text>
        </View>
      </View>

      <ScrollView style={{flex:1}}
        contentContainerStyle={{
          paddingHorizontal: Math.max(L.px, insets.left + L.px),
          paddingVertical: 14,
          paddingBottom: insets.bottom + 30,
        }}
        showsVerticalScrollIndicator={false} bounces>
        {unsorted.map((t:any) => (
          <View key={t.id} style={{backgroundColor:C.card, borderRadius:18, padding:14,
            marginBottom:10, borderWidth:1, borderColor:C.cardB}}>
            {/* Transaction row */}
            <View style={{flexDirection:'row', alignItems:'center', gap:10, marginBottom:10}}>
              <MerchantIcon merchant={t.merchant} bucket={t.bucket} size={42}/>
              <View style={{flex:1}}>
                <Text style={{fontSize:15, fontWeight:'700', color:C.t1}} numberOfLines={1}>{t.merchant}</Text>
                <Text style={{fontSize:11, color:C.t4, marginTop:2}}>{t.date} · {t.source==='sms'?'Bank SMS':'Manual'}</Text>
              </View>
              <Text style={{fontSize:17, fontWeight:'800', color:C.t1}}>₹{t.amount.toLocaleString('en-IN')}</Text>
            </View>

            {/* SMS preview */}
            {t.sms ? (
              <Text style={{fontSize:11, color:C.t3, backgroundColor:C.bg, borderRadius:8,
                padding:8, marginBottom:10, lineHeight:17,
                fontFamily:Platform.OS==='ios'?'Menlo':'monospace'}}
                numberOfLines={2}>{t.sms}</Text>
            ) : null}

            {/* Bucket picker */}
            <View style={{flexDirection:'row', gap:6}}>
              {Object.entries(B).map(([key, cfg]:any) => (
                <TouchableOpacity key={key}
                  style={{flex:1, alignItems:'center', borderWidth:1.5, borderRadius:12,
                    paddingVertical:8, gap:3, borderColor:cfg.color, backgroundColor:cfg.light}}
                  onPress={()=>onClassify(t.id, key)}>
                  <BucketIcon bucket={key} size={22}/>
                  <Text style={{fontSize:9, fontWeight:'700', color:cfg.color}}>{cfg.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Delete */}
            <View style={{alignItems:'flex-end', marginTop:8}}>
              <TouchableOpacity onPress={()=>Alert.alert(
                'Delete transaction?',
                `Remove ₹${t.amount} at ${t.merchant}?`,
                [{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:()=>onDelete(t.id)}]
              )}>
                <Text style={{fontSize:12, color:C.lux, fontWeight:'700'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// MY MONTH SCREEN
// ═══════════════════════════════════════════════════════════
const MyMonthScreen = ({nav, summary, transactions}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const total = summary.total || 0;

  const buckets = Object.entries(B).map(([key, cfg]:any) => ({
    key, ...cfg,
    amount: summary[key] || 0,
    pct: total > 0 ? Math.round(((summary[key]||0)/total)*100) : 0,
  }));

  // Weekly breakdown
  const weeks: any = {'W1':{},'W2':{},'W3':{},'W4':{}};
  transactions.filter((t:any)=>t.bucket).forEach((t:any)=>{
    const day = parseInt(t.date) || 1;
    const wk = day<=7?'W1':day<=14?'W2':day<=21?'W3':'W4';
    weeks[wk][t.bucket] = (weeks[wk][t.bucket]||0) + t.amount;
  });
  const weekMax = Math.max(...Object.values(weeks).map((w:any)=>
    Object.values(w).reduce((a:any,b:any)=>a+b, 0) as number), 1);

  const shareMonth = async () => {
    const month = new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'});
    const lines = buckets.map(b=>`${b.label}: ₹${b.amount.toLocaleString('en-IN')} (${b.pct}%)`).join('\n');
    const text = [
      `My Month — ${month}`,
      `Total: ₹${total.toLocaleString('en-IN')}`,
      '',
      lines,
      '',
      'Generated by Spend-na',
      '© Sandeep Hakki · hakki.in · 2026',
    ].join('\n');
    try { await Share.share({message:text, title:`My Month — ${month}`}); } catch{}
  };

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      <ScreenHeader
        title="My Month"
        subtitle={new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'})}
        right={
          <TouchableOpacity onPress={shareMonth}>
            <Text style={{fontSize:12, color:C.brand, fontWeight:'700'}}>Share ↑</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={{flex:1}}
        contentContainerStyle={{
          paddingHorizontal: Math.max(L.px, insets.left + L.px),
          paddingVertical: 20,
          paddingBottom: insets.bottom + 30,
        }}
        showsVerticalScrollIndicator={false} bounces>

        {total > 0 ? (
          <>
            {/* Colour bar */}
            <View style={{marginBottom:18}}>
              <View style={{height:18, borderRadius:9, flexDirection:'row', overflow:'hidden', marginBottom:10}}>
                {buckets.map(b=>b.amount>0 && (
                  <View key={b.key} style={{flex:b.amount, backgroundColor:b.color}}/>
                ))}
              </View>
              <View style={{flexDirection:'row', flexWrap:'wrap', gap:10}}>
                {buckets.map(b=>b.amount>0 && (
                  <View key={b.key} style={{flexDirection:'row', alignItems:'center', gap:5}}>
                    <View style={{width:8, height:8, borderRadius:4, backgroundColor:b.color}}/>
                    <Text style={{fontSize:11, color:C.t2, fontWeight:'600'}}>{b.label} {b.pct}%</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Total card */}
            <View style={{backgroundColor:C.dark, borderRadius:18, padding:18, marginBottom:14,
              flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
              <Text style={{fontSize:13, color:C.t4}}>Total this month</Text>
              <Text style={{fontSize:22, fontWeight:'800', color:C.white}}>
                ₹ {total.toLocaleString('en-IN')}
              </Text>
            </View>

            {/* Weekly bar chart */}
            <View style={{backgroundColor:C.card, borderRadius:18, padding:16,
              marginBottom:14, borderWidth:1, borderColor:C.cardB}}>
              <Text style={{fontSize:13, fontWeight:'800', color:C.t1, marginBottom:14}}>Weekly Breakdown</Text>
              <View style={{flexDirection:'row', gap:8, alignItems:'flex-end', height:110}}>
                {Object.entries(weeks).map(([wk, data]:any) => {
                  const wkTotal = Object.values(data).reduce((a:any,b:any)=>a+b, 0) as number;
                  const barH = weekMax > 0 ? (wkTotal/weekMax) * 80 : 0;
                  return (
                    <View key={wk} style={{flex:1, alignItems:'center', gap:4}}>
                      <Text style={{fontSize:9, color:C.t4, fontWeight:'700'}}>
                        {wkTotal > 0 ? `${Math.round(wkTotal/1000)}k` : ''}
                      </Text>
                      <View style={{width:'100%', height:80, justifyContent:'flex-end'}}>
                        <View style={{width:'100%', height:Math.max(barH, 2), borderRadius:6,
                          overflow:'hidden', flexDirection:'column', justifyContent:'flex-end'}}>
                          {Object.entries(B).map(([bk, cfg]:any) => {
                            const bAmt = data[bk] || 0;
                            const bH = wkTotal > 0 ? (bAmt/wkTotal)*Math.max(barH,2) : 0;
                            return bAmt>0 ? (
                              <View key={bk} style={{width:'100%', height:bH, backgroundColor:cfg.color}}/>
                            ) : null;
                          })}
                        </View>
                      </View>
                      <Text style={{fontSize:9, color:C.t4}}>{wk}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Bucket detail cards */}
            {buckets.map(b => (
              <TouchableOpacity key={b.key}
                style={{backgroundColor:C.card, borderRadius:18, padding:14, marginBottom:10,
                  flexDirection:'row', alignItems:'center', gap:12,
                  borderLeftWidth:4, borderLeftColor:b.color,
                  borderWidth:1, borderColor:C.cardB}}
                onPress={()=>nav('SliceDetail', {bucket:b})}>
                <BucketIcon bucket={b.key} size={48}/>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15, fontWeight:'700', color:C.t1, marginBottom:5}}>{b.label}</Text>
                  <View style={{height:5, backgroundColor:C.bg, borderRadius:3, overflow:'hidden', marginBottom:3}}>
                    <View style={{height:5, width:`${b.pct}%`, backgroundColor:b.color, borderRadius:3}}/>
                  </View>
                  <Text style={{fontSize:11, color:C.t4}}>{b.tag}</Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                  <Text style={{fontSize:17, fontWeight:'800', color:b.color}}>
                    ₹{b.amount.toLocaleString('en-IN')}
                  </Text>
                  <Text style={{fontSize:11, color:C.t4, marginTop:2}}>{b.pct}%</Text>
                </View>
                <Text style={{fontSize:20, color:C.t4}}>›</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <View style={{alignItems:'center', paddingVertical:56}}>
            <Text style={{fontSize:18, fontWeight:'700', color:C.t1, marginBottom:8}}>Nothing sorted yet</Text>
            <Text style={{fontSize:13, color:C.t4, marginBottom:24, textAlign:'center'}}>
              Sort your spends and see{'\n'}your monthly picture here.
            </Text>
            <TouchableOpacity style={{backgroundColor:C.brand, paddingHorizontal:24,
              paddingVertical:12, borderRadius:14}}
              onPress={()=>nav('Sort')}>
              <Text style={{fontWeight:'700', color:C.dark}}>Go sort ›</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// SLICE DETAIL
// ═══════════════════════════════════════════════════════════
const SliceDetailScreen = ({nav, bucket, profile}: any) => {
  const [answer, setAnswer] = useState<boolean|null>(null);
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const insets = useSafeAreaInsets();

  if (!bucket) { nav('MyMonth'); return null; }

  const reflections: any = {
    luxury:      {yes:'Glad to hear it. Keep an eye on next week.', no:"That's okay. You will find your rhythm."},
    necessary:   {yes:'You are taking care of yourself. Well done.', no:'Essentials sometimes spike. You are doing the right thing.'},
    committed:   {yes:'Your obligations are under control. Great discipline.', no:'Big month for commitments. This too shall pass.'},
    comfortable: {yes:'You enjoyed life this month. That matters too.', no:'Small adjustments next month will make a big difference.'},
  };
  const msg = reflections[bucket.key] || reflections.comfortable;

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      <ScreenHeader title={bucket.label} onBack={()=>nav('MyMonth')}/>
      <ScrollView style={{flex:1}}
        contentContainerStyle={{
          paddingHorizontal: Math.max(L.px, insets.left + L.px),
          paddingVertical: 24,
          paddingBottom: insets.bottom + 30,
          alignItems:'center',
        }}
        showsVerticalScrollIndicator={false} bounces>

        <BucketIcon bucket={bucket.key} size={100} style={{marginBottom:14}}/>
        <Text style={{fontSize:40, fontWeight:'800', color:C.t1, letterSpacing:-1, marginBottom:4}}>
          ₹ {bucket.amount.toLocaleString('en-IN')}
        </Text>
        <Text style={{fontSize:14, color:C.t4, marginBottom:24}}>
          {bucket.pct}% of total this month
        </Text>

        {/* Ring */}
        <View style={{width:100, height:100, borderRadius:50, borderWidth:8,
          borderColor:bucket.color, alignItems:'center', justifyContent:'center', marginBottom:28}}>
          <Text style={{fontSize:26, fontWeight:'900', color:bucket.color}}>{bucket.pct}%</Text>
          <Text style={{fontSize:10, color:C.t4}}>of total</Text>
        </View>

        {/* Yes / No card */}
        <View style={{backgroundColor:C.card, borderRadius:22, padding:22,
          width:'100%', maxWidth: L.isTablet ? 480 : undefined, alignItems:'center',
          borderWidth:1, borderColor:C.cardB}}>
          {answer === null ? (
            <>
              <Text style={{fontSize:19, fontWeight:'800', color:C.t1, textAlign:'center', marginBottom:6}}>
                Was it a good month?
              </Text>
              <Text style={{fontSize:13, color:C.t4, textAlign:'center', marginBottom:20}}>
                Be honest with yourself. No judgment here.
              </Text>
              <View style={{flexDirection:'row', gap:12, width:'100%'}}>
                <TouchableOpacity style={{flex:1, alignItems:'center', padding:14,
                  borderRadius:14, gap:4, backgroundColor:C.nec}}
                  onPress={()=>setAnswer(true)}>
                  <Text style={{fontSize:22, color:C.nec}}>:)</Text>
                  <Text style={{fontSize:14, fontWeight:'700', color:C.white}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems:'center', padding:14,
                  borderRadius:14, gap:4, backgroundColor:C.t3}}
                  onPress={()=>setAnswer(false)}>
                  <Text style={{fontSize:22, color:C.t3}}>:(</Text>
                  <Text style={{fontSize:14, fontWeight:'700', color:C.white}}>No</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:36, marginBottom:14}}>{answer ? ':)' : ':('}</Text>
              <Text style={{fontSize:15, color:C.t1, textAlign:'center', lineHeight:24, fontStyle:'italic'}}>
                {answer ? msg.yes : msg.no}
              </Text>
              <TouchableOpacity style={{marginTop:18}} onPress={()=>setAnswer(null)}>
                <Text style={{color:C.brand, fontWeight:'600', fontSize:13}}>Change answer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};


// ═══════════════════════════════════════════════════════════
// HISTORY SCREEN
// ═══════════════════════════════════════════════════════════
const HistoryScreen = ({transactions, onClassify, onDelete}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const [search, setSearch]             = useState('');
  const [filterBucket, setFilterBucket] = useState<string|null>(null);
  const [editing, setEditing]           = useState<string|null>(null);

  const filtered = transactions.filter((t:any) => {
    const ms = !search ||
      t.merchant.toLowerCase().includes(search.toLowerCase()) ||
      t.amount.toString().includes(search);
    const mb = !filterBucket ||
      (filterBucket === 'unsorted' ? !t.bucket : t.bucket === filterBucket);
    return ms && mb;
  });

  const grouped: Record<string, any[]> = {};
  filtered.forEach((t:any) => {
    const k = t.month || 'Unknown';
    if (!grouped[k]) grouped[k] = [];
    grouped[k].push(t);
  });

  const exportCSV = async () => {
    const month = new Date().toLocaleDateString('en-IN',{month:'long',year:'numeric'});
    const total = transactions.reduce((s:number,t:any)=>s+t.amount,0);
    const bucketTotals: any = {};
    Object.keys(B).forEach(k => {
      bucketTotals[k] = transactions.filter((t:any)=>t.bucket===k).reduce((s:number,t:any)=>s+t.amount,0);
    });
    const rows = transactions.map((t:any) => {
      const cfg = t.bucket ? B[t.bucket] : null;
      const color = cfg ? cfg.color : '#94a3b8';
      const label = cfg ? cfg.label : 'Unsorted';
      return `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#334155">${t.date}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;color:#0f172a;font-weight:600">${t.merchant}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:700;color:#0f172a;text-align:right">&#8377;${t.amount.toLocaleString('en-IN')}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f1f5f9;text-align:center">
          <span style="background:${color}20;color:${color};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;border:1px solid ${color}40">${label}</span>
        </td>
      </tr>`;
    }).join('');
    const bucketCards = Object.entries(B).map(([k,cfg]:any) => {
      const amt = bucketTotals[k] || 0;
      const pct = total > 0 ? Math.round((amt/total)*100) : 0;
      return `<div style="flex:1;min-width:140px;background:${cfg.light};border-radius:14px;padding:14px;border:1.5px solid ${cfg.mid}">
        <div style="font-size:11px;color:${cfg.color};font-weight:700;letter-spacing:1px;margin-bottom:6px">${cfg.label.toUpperCase()}</div>
        <div style="font-size:20px;font-weight:800;color:${cfg.color}">&#8377;${amt.toLocaleString('en-IN')}</div>
        <div style="font-size:11px;color:#64748b;margin-top:4px">${pct}% of total</div>
        <div style="height:4px;background:#e2e8f0;border-radius:2px;margin-top:8px;overflow:hidden">
          <div style="height:4px;width:${pct}%;background:${cfg.color};border-radius:2px"></div>
        </div>
      </div>`;
    }).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Spend-na — ${month}</title>
    </head>
    <body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f8fafc;margin:0;padding:20px">
      <div style="max-width:700px;margin:0 auto">
        <div style="background:linear-gradient(135deg,#080e1d,#1f2937);border-radius:20px;padding:28px;margin-bottom:20px;color:white">
          <div style="font-size:26px;font-weight:900;letter-spacing:-1px;color:#06b6d4">Spend-na</div>
          <div style="font-size:14px;color:#94a3b8;margin-top:4px">Monthly Report — ${month}</div>
          <div style="font-size:38px;font-weight:800;margin-top:16px">&#8377;${total.toLocaleString('en-IN')}</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Total this month</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:20px">${bucketCards}</div>
        <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06)">
          <div style="padding:16px 20px;border-bottom:1px solid #f1f5f9">
            <div style="font-size:15px;font-weight:800;color:#0f172a">All Transactions</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:2px">${transactions.length} records</div>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#f8fafc">
                <th style="padding:10px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:1px">DATE</th>
                <th style="padding:10px 12px;text-align:left;font-size:11px;color:#64748b;font-weight:700;letter-spacing:1px">MERCHANT</th>
                <th style="padding:10px 12px;text-align:right;font-size:11px;color:#64748b;font-weight:700;letter-spacing:1px">AMOUNT</th>
                <th style="padding:10px 12px;text-align:center;font-size:11px;color:#64748b;font-weight:700;letter-spacing:1px">BUCKET</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div style="text-align:center;padding:24px;color:#94a3b8;font-size:11px;line-height:18px">
          Generated by Spend-na<br>
          © Sandeep Hakki · hakki.in · 2026<br>
          Your data never left your phone.
        </div>
      </div>
    </body></html>`;
    try {
      await Share.share({message: html, title: 'Spend-na — ' + month});
    } catch {}
  };

  const pills = [
    {key:null, label:'All'},
    ...Object.entries(B).map(([k,v]:any) => ({key:k, label:v.label})),
    {key:'unsorted', label:'Unsorted'},
  ];

  const px = Math.max(L.px, insets.left + L.px);

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      {/* Header */}
      <View style={{backgroundColor:C.card,
        paddingTop: insets.top + 8, paddingLeft: px, paddingRight: px, paddingBottom: 10,
        borderBottomWidth:1, borderBottomColor:C.cardB}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10}}>
          <View>
            <Text style={{fontSize:22, fontWeight:'800', color:C.t1}}>History</Text>
            <Text style={{fontSize:11, color:C.t4}}>{transactions.length} transactions</Text>
          </View>
          <TouchableOpacity style={{backgroundColor:C.dark, paddingHorizontal:12,
            paddingVertical:7, borderRadius:12}} onPress={exportCSV}>
            <Text style={{fontSize:12, fontWeight:'700', color:C.white}}>Export ↑</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={{flexDirection:'row', alignItems:'center', backgroundColor:C.bg,
          borderRadius:12, borderWidth:1.5, borderColor:C.cardB, paddingHorizontal:12, marginBottom:10}}>
          <TextInput style={{flex:1, paddingVertical:9, fontSize:14, color:C.t1}}
            placeholder="Search..." value={search}
            onChangeText={(v)=>setSearch(S.search(v))}
            placeholderTextColor={C.t4} returnKeyType="search"/>
          {search.length > 0 && (
            <TouchableOpacity onPress={()=>setSearch('')}>
              <Text style={{color:C.t3, fontWeight:'700'}}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          style={{flexGrow:0}} contentContainerStyle={{gap:8, paddingRight:4}}>
          {pills.map(f => {
            const active = filterBucket === f.key;
            const cfg = f.key && B[f.key];
            return (
              <TouchableOpacity key={String(f.key)}
                style={{paddingHorizontal:14, paddingVertical:7, borderRadius:20,
                  borderWidth:1.5,
                  borderColor: active ? (cfg ? cfg.color : C.dark) : C.cardB,
                  backgroundColor: active ? (cfg ? cfg.color : C.dark) : C.card}}
                onPress={()=>setFilterBucket(active ? null : f.key)}>
                <Text style={{fontSize:12, fontWeight:'600',
                  color: active ? C.white : C.t2}}>{f.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={{flex:1}}
        contentContainerStyle={{paddingHorizontal:px, paddingVertical:14, paddingBottom: insets.bottom+30}}
        showsVerticalScrollIndicator={false} bounces>

        {Object.keys(grouped).length === 0 && (
          <View style={{alignItems:'center', paddingVertical:48}}>
            <Text style={{fontSize:15, color:C.t3}}>No results found</Text>
          </View>
        )}

        {Object.entries(grouped).map(([month, items]) => (
          <View key={month}>
            <View style={{flexDirection:'row', justifyContent:'space-between',
              alignItems:'center', paddingVertical:8, marginBottom:6}}>
              <Text style={{fontSize:13, fontWeight:'800', color:C.t1}}>{month}</Text>
              <Text style={{fontSize:13, fontWeight:'700', color:C.brand}}>
                ₹ {items.reduce((s,t)=>s+t.amount,0).toLocaleString('en-IN')}
              </Text>
            </View>

            {items.map((t:any) => (
              <View key={t.id} style={{backgroundColor:C.card, borderRadius:14, padding:12,
                marginBottom:8, borderWidth:1, borderColor:C.cardB}}>
                <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
                  <MerchantIcon merchant={t.merchant} bucket={t.bucket} size={38}/>
                  <View style={{flex:1}}>
                    <Text style={{fontSize:13, fontWeight:'700', color:C.t1, marginBottom:2}}
                      numberOfLines={1}>{t.merchant}</Text>
                    <Text style={{fontSize:10, color:C.t4}}>{t.date} · {t.time}</Text>
                    {t.bucket && (
                      <Text style={{fontSize:10, fontWeight:'700',
                        color:B[t.bucket].color, marginTop:2}}>{B[t.bucket].label}</Text>
                    )}
                  </View>
                  <View style={{alignItems:'flex-end'}}>
                    <Text style={{fontSize:15, fontWeight:'800', color:C.t1, marginBottom:6}}>
                      ₹{t.amount.toLocaleString('en-IN')}
                    </Text>
                    <View style={{flexDirection:'row', gap:10}}>
                      <TouchableOpacity onPress={()=>setEditing(editing===t.id?null:t.id)}>
                        <Text style={{fontSize:11, color:C.brand, fontWeight:'700'}}>Edit</Text>
                      </TouchableOpacity>
                      <Text style={{color:C.cardB}}>|</Text>
                      <TouchableOpacity onPress={()=>Alert.alert(
                        'Delete transaction?',
                        `Remove ₹${t.amount} at ${t.merchant}?`,
                        [{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:()=>onDelete(t.id)}]
                      )}>
                        <Text style={{fontSize:11, color:C.lux, fontWeight:'700'}}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Inline edit */}
                {editing === t.id && (
                  <View style={{marginTop:10, backgroundColor:C.bg, borderRadius:12,
                    padding:10, borderWidth:1, borderColor:C.cardB}}>
                    <Text style={{fontSize:10, color:C.t4, letterSpacing:2,
                      fontWeight:'700', marginBottom:8}}>CHANGE BUCKET</Text>
                    <View style={{flexDirection:'row', gap:6}}>
                      {Object.entries(B).map(([key, cfg]:any) => (
                        <TouchableOpacity key={key}
                          style={[{flex:1, alignItems:'center', padding:7, borderRadius:10,
                            borderWidth:1.5, borderColor:C.cardB, gap:3},
                            t.bucket===key && {backgroundColor:cfg.light, borderColor:cfg.color}]}
                          onPress={()=>{onClassify(t.id, key); setEditing(null);}}>
                          <BucketIcon bucket={key} size={22}/>
                          <Text style={[{fontSize:9, color:C.t3, fontWeight:'600'},
                            t.bucket===key && {color:cfg.color, fontWeight:'800'}]}>
                            {cfg.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// MANUAL ADD SCREEN
// ═══════════════════════════════════════════════════════════
const ManualAddScreen = ({nav, onAdd}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const [amount, setAmount]   = useState('');
  const [desc, setDesc]       = useState('');
  const [source, setSource]   = useState<string|null>(null);
  const [bucket, setBucket]   = useState<string|null>(null);
  const canSave = amount && parseFloat(amount) > 0 && bucket && source;
  const px = Math.max(L.px, insets.left + L.px);

  const handleSave = () => {
    if (!canSave) return;
    Keyboard.dismiss();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount.');
      return;
    }
    onAdd({amount: num, description: desc.trim(), source, bucket});
    Alert.alert('Saved ✓', `₹${amount} added to ${B[bucket!].label}`,
      [{text:'Add another', onPress:()=>{ setAmount(''); setDesc(''); setBucket(null); setSource(null); }},
       {text:'Done', onPress:()=>nav('Home')}]);
  };

  const sources = [
    {key:'cash', label:'Cash', icon:'₹'},
    {key:'upi', label:'UPI', icon:'U'},
    {key:'others', label:"Others' UPI", icon:'O'},
    {key:'hand_loan', label:'Hand Loan', icon:'L'},
  ];

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      <ScreenHeader title="Add Spend" onBack={()=>nav('Home')}
        right={
          <TouchableOpacity
            style={[{backgroundColor:C.brand, paddingHorizontal:14,
              paddingVertical:7, borderRadius:14}, !canSave && {opacity:0.3}]}
            disabled={!canSave} onPress={handleSave}>
            <Text style={{fontWeight:'700', color:C.dark, fontSize:13}}>Save</Text>
          </TouchableOpacity>
        }/>

      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':undefined}>
        <ScrollView style={{flex:1}}
          contentContainerStyle={{paddingHorizontal:px, paddingVertical:18, paddingBottom:insets.bottom+40}}
          showsVerticalScrollIndicator={false} bounces keyboardShouldPersistTaps="handled">

          {/* Amount input */}
          <View style={{backgroundColor:C.card, borderRadius:20, padding:20,
            flexDirection:'row', alignItems:'center', marginBottom:22,
            borderWidth:1, borderColor:C.cardB}}>
            <Text style={{fontSize:30, color:C.t4, fontWeight:'300', marginRight:4}}>₹</Text>
            <TextInput
              style={{fontSize:46, fontWeight:'800', color:C.t1, flex:1, padding:0}}
              placeholder="0" keyboardType="decimal-pad"
              value={amount} onChangeText={(v)=>setAmount(S.amount(v))}
              placeholderTextColor={C.t4} returnKeyType="done"
              onSubmitEditing={()=>Keyboard.dismiss()}/>
          </View>

          {/* Description */}
          <Text style={ADD.label}>WHAT WAS IT FOR?</Text>
          <TextInput style={ADD.input}
            placeholder="e.g. Lunch, Petrol, School fees"
            value={desc} onChangeText={(v)=>setDesc(S.text(v))}
            placeholderTextColor={C.t4} returnKeyType="done"
            onSubmitEditing={()=>Keyboard.dismiss()}/>

          {/* Payment source */}
          <Text style={ADD.label}>HOW DID YOU PAY?</Text>
          <View style={{flexDirection:'row', gap:8, marginBottom:22, flexWrap:'wrap'}}>
            {sources.map(o => (
              <TouchableOpacity key={o.key}
                style={[ADD.opt, {flex: L.isTablet ? 0 : 1, minWidth: L.isTablet ? 100 : 0},
                  source===o.key && {borderColor:C.brand, backgroundColor:C.brandL}]}
                onPress={()=>setSource(o.key)}>
                <Text style={{fontSize:16}}>{o.icon}</Text>
                <Text style={[{fontSize:10, color:C.t1, fontWeight:'600', textAlign:'center'},
                  source===o.key && {color:C.brandD, fontWeight:'800'}]}>{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bucket picker */}
          <Text style={ADD.label}>WHICH BUCKET?</Text>
          <View style={{flexDirection:'row', flexWrap:'wrap', gap:10}}>
            {Object.entries(B).map(([key, cfg]:any) => {
              const cardW = L.isTablet
                ? (width - px*2 - 30) / 4
                : (width - px*2 - 10) / 2;
              return (
                <TouchableOpacity key={key}
                  style={[ADD.bucketOpt, {width:cardW},
                    bucket===key && {borderColor:cfg.color, backgroundColor:cfg.light}]}
                  onPress={()=>setBucket(key)}>
                  <BucketIcon bucket={key} size={34}/>
                  <Text style={[{fontSize:12, color:C.t2, fontWeight:'600', textAlign:'center'},
                    bucket===key && {color:cfg.color, fontWeight:'800'}]}>{cfg.label}</Text>
                  <Text style={{fontSize:9, color:C.t4, textAlign:'center', lineHeight:13}}>{cfg.tag}</Text>
                  {bucket===key && (
                    <View style={{position:'absolute', top:6, right:6, backgroundColor:cfg.color,
                      paddingHorizontal:5, paddingVertical:2, borderRadius:6}}>
                      <Text style={{color:C.white, fontSize:9, fontWeight:'900'}}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const ADD = StyleSheet.create({
  label:     {fontSize:10, color:C.t4, letterSpacing:2, fontWeight:'700', marginBottom:10},
  input:     {backgroundColor:C.card, borderRadius:14, padding:14, fontSize:15, color:C.t1,
              borderWidth:1.5, borderColor:C.cardB, marginBottom:22},
  opt:       {backgroundColor:C.card, borderRadius:12, padding:10, alignItems:'center',
              borderWidth:1.5, borderColor:C.cardB, gap:4},
  bucketOpt: {backgroundColor:C.card, borderRadius:16, padding:12, alignItems:'center',
              gap:6, borderWidth:2, borderColor:C.cardB, position:'relative'},
});

// ═══════════════════════════════════════════════════════════
// LIMITS SCREEN
// ═══════════════════════════════════════════════════════════
const LimitsScreen = ({nav, limits, summary, onSave}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const [vals, setVals] = useState<any>({...limits});
  const px = Math.max(L.px, insets.left + L.px);

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      <ScreenHeader title="Budget Limits" onBack={()=>nav('Home')}
        right={
          <TouchableOpacity style={{backgroundColor:C.brand, paddingHorizontal:12,
            paddingVertical:6, borderRadius:12}}
            onPress={()=>{onSave(vals); Alert.alert('Saved ✓','Limits updated.');}}>
            <Text style={{fontWeight:'700', color:C.dark, fontSize:12}}>Save</Text>
          </TouchableOpacity>
        }/>
      <ScrollView style={{flex:1}}
        contentContainerStyle={{paddingHorizontal:px, paddingVertical:18, paddingBottom:insets.bottom+30}}
        showsVerticalScrollIndicator={false} bounces keyboardShouldPersistTaps="handled">

        {Object.entries(B).map(([key, cfg]:any) => {
          const amt = summary[key] || 0;
          const limit = vals[key] || 0;
          const pct = limit > 0 ? Math.min((amt/limit)*100, 100) : 0;
          const isOver = limit > 0 && amt > limit;
          const isNear = limit > 0 && amt >= limit*0.8 && !isOver;
          return (
            <View key={key} style={{backgroundColor:C.card, borderRadius:18, padding:16,
              marginBottom:12, borderWidth:1, borderColor:C.cardB,
              borderLeftWidth:4, borderLeftColor:cfg.color}}>
              <View style={{flexDirection:'row', alignItems:'center', gap:10, marginBottom:12}}>
                <BucketIcon bucket={key} size={38}/>
                <View style={{flex:1}}>
                  <Text style={{fontSize:15, fontWeight:'700', color:C.t1}}>{cfg.label}</Text>
                  <Text style={{fontSize:11, color:C.t4}}>{cfg.tag}</Text>
                </View>
                {isOver && <Text style={{fontSize:10, fontWeight:'800', color:C.danger}}>OVER</Text>}
                {isNear && <Text style={{fontSize:10, fontWeight:'800', color:C.warning}}>NEAR</Text>}
              </View>

              <View style={{flexDirection:'row', alignItems:'center', gap:10, marginBottom:10}}>
                <Text style={{fontSize:14, color:C.t3}}>₹</Text>
                <TextInput
                  style={{flex:1, backgroundColor:C.bg, borderRadius:12, paddingHorizontal:12,
                    paddingVertical:10, fontSize:16, fontWeight:'700', color:cfg.color,
                    borderWidth:1.5, borderColor:isOver?C.danger:isNear?C.warning:C.cardB}}
                  keyboardType="numeric" value={vals[key]?.toString()||''}
                  onChangeText={(v)=>{
                    const n = parseFloat(S.amount(v));
                    setVals((p:any)=>({...p, [key]: isNaN(n)?0:n}));
                  }}
                  returnKeyType="done" onSubmitEditing={()=>Keyboard.dismiss()}/>
              </View>

              {limit > 0 && (
                <View>
                  <View style={{height:6, backgroundColor:cfg.light, borderRadius:3, overflow:'hidden', marginBottom:4}}>
                    <View style={{height:6, width:`${pct}%`,
                      backgroundColor: isOver?C.danger:isNear?C.warning:cfg.color, borderRadius:3}}/>
                  </View>
                  <Text style={{fontSize:11, color:C.t4}}>
                    ₹{amt.toLocaleString('en-IN')} of ₹{limit.toLocaleString('en-IN')} ({Math.round(pct)}%)
                  </Text>
                </View>
              )}

              {/* Quick set buttons */}
              <View style={{flexDirection:'row', gap:6, marginTop:10, flexWrap:'wrap'}}>
                {[5000,10000,15000,25000,30000].map(q => (
                  <TouchableOpacity key={q}
                    style={{paddingHorizontal:10, paddingVertical:5, borderRadius:8,
                      backgroundColor: vals[key]===q ? cfg.color : cfg.light,
                      borderWidth:1, borderColor:cfg.mid}}
                    onPress={()=>setVals((p:any)=>({...p,[key]:q}))}>
                    <Text style={{fontSize:11, fontWeight:'700',
                      color: vals[key]===q ? C.white : cfg.color}}>
                      {q>=1000 ? `${q/1000}k` : q}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={{backgroundColor:C.bg, borderRadius:14, padding:14,
          borderWidth:1.5, borderColor:C.cardB, alignItems:'center', marginTop:8}}
          onPress={()=>{
            Alert.alert('Reset to defaults?','This will restore the original limit values.',
              [{text:'Cancel',style:'cancel'},
               {text:'Reset',onPress:()=>setVals({...DEFAULT_LIMITS})}]);
          }}>
          <Text style={{fontSize:13, color:C.t3, fontWeight:'600'}}>Reset to defaults</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// SETTINGS + HELP SCREEN (merged — accessible via { } on Home)
// ═══════════════════════════════════════════════════════════
const SettingsScreen = ({nav, profile, settings, limits, transactions,
  onSaveProfile, onSaveSettings, onSaveLimits, onClearData, onImport}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);
  const [ep, setEp]     = useState<any>({...profile});
  const [es, setEs]     = useState<any>({...settings});
  const [open, setOpen] = useState<string|null>('profile');
  const px = Math.max(L.px, insets.left + L.px);

  const pickPhoto = () => {
    launchImageLibrary({mediaType:'photo', quality:0.7, selectionLimit:1}, (r) => {
      const uri = r?.assets?.[0]?.uri;
      if (uri) setEp((p:any)=>({...p, photo: uri}));
    });
  };

  const saveAll = async () => {
    Keyboard.dismiss();
    await store.set(KEYS.profile, ep);
    await store.set(KEYS.settings, es);
    onSaveProfile(ep);
    onSaveSettings(es);
    Alert.alert('Saved ✓','Your settings are updated.');
  };

  const backupNow = async () => {
    const payload = createBackupPayload(transactions, ep, limits);
    const json = JSON.stringify(payload, null, 2);
    try {
      await Share.share({message: json, title:'Spend-na Backup'});
    } catch {}
  };

  const importBackup = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DPTypes.allFiles],
        copyTo: 'cachesDirectory',
      });
      const uri = result.fileCopyUri || result.uri;
      if (!uri) { Alert.alert('Error', 'Could not read file.'); return; }
      const response = await fetch(uri);
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (!data.transactions || !Array.isArray(data.transactions)) {
          Alert.alert('Invalid backup', 'This does not look like a Spend-na backup file.');
          return;
        }
        Alert.alert(
          'Restore backup?',
          `Found ${data.transactions.length} transactions.\nMerge with existing data? No duplicates.`,
          [
            {text:'Cancel', style:'cancel'},
            {text:'Restore', onPress: async () => {
              const merged = mergeTransactions(transactions, data.transactions);
              await store.set(KEYS.transactions, merged);
              onImport(merged);
              Alert.alert('Restored ✓', `${merged.length} transactions loaded. No duplicates.`);
            }},
          ]
        );
      } catch {
        Alert.alert('Could not read file', 'File appears corrupted or is not a valid Spend-na backup.');
      }
    } catch (err: any) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('Error', 'Could not open file picker. Please try again.');
      }
    }
  };

  const clearAllData = () => {
    Alert.alert(
      'Clear all data?',
      'This will delete all your transactions and settings. This cannot be undone.\n\nWe recommend taking a backup first.',
      [
        {text:'Cancel', style:'cancel'},
        {text:'Backup first', onPress: backupNow},
        {text:'Clear everything', style:'destructive', onPress: async () => {
          await store.clear();
          onClearData();
        }},
      ]
    );
  };

  const Accordion = ({id, title, children}: any) => (
    <View style={{backgroundColor:C.card, borderRadius:16, marginBottom:8,
      borderWidth:1, borderColor:C.cardB, overflow:'hidden'}}>
      <TouchableOpacity style={{padding:16, flexDirection:'row',
        justifyContent:'space-between', alignItems:'center'}}
        onPress={()=>setOpen(open===id?null:id)}>
        <Text style={{fontSize:15, fontWeight:'700', color:C.t1}}>{title}</Text>
        <Text style={{fontSize:18, color:C.brand, fontWeight:'700'}}>{open===id?'−':'+'}</Text>
      </TouchableOpacity>
      {open===id && (
        <View style={{paddingHorizontal:16, paddingBottom:16,
          borderTopWidth:1, borderTopColor:C.cardB}}>
          {children}
        </View>
      )}
    </View>
  );

  const howItWorks = [
    {q:'What is Spend-na?', a:'Not a budget app. Not a tracker. A mirror for your money. It makes invisible digital spending visible — without guilt or judgment.'},
    {q:'How do the 4 buckets work?', a:'Necessary = survival needs. Committed = obligations you already chose. Comfortable = the good life. Luxury = pure want. You classify every spend — no assumptions.'},
    {q:'Does my data go to any server?', a:'Never. All data lives only on your phone. No account, no cloud, no tracking. Ever. This is our promise.'},
    {q:'What is the Yes/No question?', a:'After sorting your month, tap any bucket and ask yourself: Was it a good month? That honest reflection — just two buttons — is the whole point of Spend-na.'},
    {q:'Why no SMS auto-read on iPhone?', a:'Apple does not allow any app to read SMS. It is a hardware privacy restriction. Use Add Manually or copy-paste from your bank message.'},
  ];

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      <ScreenHeader title="Settings & Help" onBack={()=>nav('Home')}
        right={
          <TouchableOpacity style={{backgroundColor:C.brand, paddingHorizontal:12,
            paddingVertical:6, borderRadius:12}} onPress={saveAll}>
            <Text style={{fontWeight:'700', color:C.dark, fontSize:12}}>Save</Text>
          </TouchableOpacity>
        }/>

      <ScrollView style={{flex:1}}
        contentContainerStyle={{paddingHorizontal:px, paddingVertical:16, paddingBottom:insets.bottom+40}}
        showsVerticalScrollIndicator={false} bounces keyboardShouldPersistTaps="handled">

        {/* Profile */}
        <Accordion id="profile" title="[P]  My Profile">
          <TouchableOpacity style={{alignSelf:'center', marginVertical:14}} onPress={pickPhoto}>
            <View style={{width:76, height:76, borderRadius:24, overflow:'hidden',
              borderWidth:2, borderColor:C.brand}}>
              {ep?.photo
                ? <Image source={{uri:ep.photo}} style={{width:76, height:76}} resizeMode="cover"/>
                : <View style={{flex:1, backgroundColor:C.brand, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:28, fontWeight:'800', color:C.white}}>
                      {ep?.name?.[0]?.toUpperCase()||'S'}
                    </Text>
                  </View>
              }
            </View>
            <View style={{position:'absolute', bottom:-4, right:-4, width:22, height:22,
              borderRadius:11, backgroundColor:C.success, alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:C.white, fontSize:11, fontWeight:'700'}}>+</Text>
            </View>
          </TouchableOpacity>

          {[
            {label:'Name', key:'name', placeholder:'Your name', sanitize:S.name, keyboard:'default'},
            {label:'City', key:'city', placeholder:'Your city', sanitize:S.city, keyboard:'default'},
            {label:'Date of Birth', key:'dob', placeholder:'DD/MM/YYYY', sanitize:S.dob, keyboard:'numbers-and-punctuation'},
          ].map(f => (
            <View key={f.key} style={{marginTop:12}}>
              <Text style={{fontSize:10, color:C.t4, letterSpacing:1.5, fontWeight:'700', marginBottom:6}}>
                {f.label.toUpperCase()}
              </Text>
              <TextInput
                style={{backgroundColor:C.bg, borderRadius:12, padding:12, fontSize:14,
                  color:C.t1, borderWidth:1.5, borderColor:C.cardB}}
                value={ep?.[f.key]||''} onChangeText={(v)=>setEp((p:any)=>({...p,[f.key]:f.sanitize(v)}))}
                placeholder={f.placeholder} placeholderTextColor={C.t4}
                autoCapitalize="words" keyboardType={f.keyboard as any}/>
            </View>
          ))}

          <View style={{marginTop:12}}>
            <Text style={{fontSize:10, color:C.t4, letterSpacing:1.5, fontWeight:'700', marginBottom:6}}>MY ROLE</Text>
            {Object.entries(ROLES).map(([key, r]:any) => (
              <TouchableOpacity key={key}
                style={{flexDirection:'row', alignItems:'center', gap:10,
                  padding:12, borderRadius:12, marginBottom:6, borderWidth:1.5,
                  borderColor: ep?.role===key ? C.brand : C.cardB,
                  backgroundColor: ep?.role===key ? C.brandL : C.bg}}
                onPress={()=>setEp((p:any)=>({...p, role:key}))}>
                <Text style={{fontSize:13, color:C.t2}}>{r.icon}</Text>
                <Text style={{fontSize:13, color: ep?.role===key ? C.brandD : C.t2, fontWeight:'600'}}>{r.label}</Text>
                {ep?.role===key && <Text style={{marginLeft:'auto', color:C.brand, fontWeight:'800'}}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>

          <View style={{marginTop:12}}>
            <Text style={{fontSize:10, color:C.t4, letterSpacing:1.5, fontWeight:'700', marginBottom:6}}>
              MY DAILY QUOTE
            </Text>
            <TextInput
              style={{backgroundColor:C.bg, borderRadius:12, padding:12, fontSize:14,
                color:C.t1, borderWidth:1.5, borderColor:C.cardB, height:72}}
              value={ep?.quote||''} onChangeText={(v)=>setEp((p:any)=>({...p,quote:S.quote(v)}))}
              placeholder="Something that motivates you..." placeholderTextColor={C.t4}
              multiline returnKeyType="done"/>
          </View>
        </Accordion>

        {/* Notifications */}
        <Accordion id="notif" title="[N]  Notifications">
          <View style={{flexDirection:'row', justifyContent:'space-between',
            alignItems:'center', paddingVertical:14}}>
            <Text style={{fontSize:14, color:C.t1}}>Morning reminder</Text>
            <TouchableOpacity
              style={{width:46, height:26, borderRadius:13,
                backgroundColor: es?.notifEnabled ? C.brand : C.cardB,
                justifyContent:'center', paddingHorizontal:3}}
              onPress={()=>setEs((p:any)=>({...p, notifEnabled:!p.notifEnabled}))}>
              <View style={{width:20, height:20, borderRadius:10, backgroundColor:C.white,
                alignSelf: es?.notifEnabled ? 'flex-end' : 'flex-start'}}/>
            </TouchableOpacity>
          </View>
          {es?.notifEnabled && (
            <View style={{flexDirection:'row', alignItems:'center', gap:12, paddingBottom:8}}>
              <Text style={{fontSize:14, color:C.t2}}>Reminder time</Text>
              <TextInput
                style={{flex:1, backgroundColor:C.bg, borderRadius:10, padding:10,
                  fontSize:15, fontWeight:'700', color:C.brand,
                  borderWidth:1.5, borderColor:C.cardB, textAlign:'center'}}
                value={`${String(es?.notifHour||8).padStart(2,'0')}:${String(es?.notifMinute||0).padStart(2,'0')}`}
                placeholder="08:00" placeholderTextColor={C.t4}
                keyboardType="numbers-and-punctuation"
                onChangeText={(v)=>{
                  const clean = v.replace(/[^0-9:]/g,'');
                  const parts = clean.split(':');
                  if (parts.length===2) {
                    const h = Math.min(23, parseInt(parts[0])||0);
                    const m = Math.min(59, parseInt(parts[1])||0);
                    setEs((p:any)=>({...p, notifHour:h, notifMinute:m}));
                  }
                }}/>
            </View>
          )}
        </Accordion>

        {/* Sound */}
        <Accordion id="sound" title="[S]  Sound Effects">
          <View style={{flexDirection:'row', justifyContent:'space-between',
            alignItems:'center', paddingVertical:14}}>
            <View>
              <Text style={{fontSize:14, color:C.t1}}>Coin sound on classify</Text>
              <Text style={{fontSize:11, color:C.t4, marginTop:2}}>Respects your phone's silent switch</Text>
            </View>
            <TouchableOpacity
              style={{width:46, height:26, borderRadius:13,
                backgroundColor: es?.soundEnabled ? C.brand : C.cardB,
                justifyContent:'center', paddingHorizontal:3}}
              onPress={()=>setEs((p:any)=>({...p, soundEnabled:!p.soundEnabled}))}>
              <View style={{width:20, height:20, borderRadius:10, backgroundColor:C.white,
                alignSelf: es?.soundEnabled ? 'flex-end' : 'flex-start'}}/>
            </TouchableOpacity>
          </View>
        </Accordion>

        {/* Data */}
        <Accordion id="data" title="[D]  My Data">
          <View style={{gap:10, paddingVertical:10}}>
            <TouchableOpacity style={{backgroundColor:C.brandL, borderRadius:12,
              padding:14, flexDirection:'row', alignItems:'center', gap:10}}
              onPress={backupNow}>
              <Text style={{fontSize:16, color:C.brandD, fontWeight:'700'}}>↑</Text>
              <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'700', color:C.brandD}}>Backup my data</Text>
                <Text style={{fontSize:11, color:C.t4}}>Save JSON to Files or share via WhatsApp</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:C.bg, borderRadius:12,
              padding:14, flexDirection:'row', alignItems:'center', gap:10,
              borderWidth:1.5, borderColor:C.cardB}}
              onPress={importBackup}>
              <Text style={{fontSize:16, color:C.t2, fontWeight:'700'}}>↓</Text>
              <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'700', color:C.t1}}>Restore from backup</Text>
                <Text style={{fontSize:11, color:C.t4}}>Merges with existing data. No duplicates.</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#fff1f2', borderRadius:12,
              padding:14, flexDirection:'row', alignItems:'center', gap:10,
              borderWidth:1.5, borderColor:'#fecdd3'}}
              onPress={clearAllData}>
              <Text style={{fontSize:16, color:C.danger, fontWeight:'700'}}>✕</Text>
              <View style={{flex:1}}>
                <Text style={{fontSize:14, fontWeight:'700', color:C.danger}}>Clear all data</Text>
                <Text style={{fontSize:11, color:C.t4}}>Backup first is recommended</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Accordion>

        {/* How it works */}
        <Accordion id="howto" title="[H] How It Works">
          {howItWorks.map((item,i) => (
            <View key={i} style={{marginTop:14, paddingBottom:14,
              borderBottomWidth: i<howItWorks.length-1?1:0, borderBottomColor:C.cardB}}>
              <Text style={{fontSize:14, fontWeight:'700', color:C.t1, marginBottom:6}}>{item.q}</Text>
              <Text style={{fontSize:13, color:C.t3, lineHeight:20}}>{item.a}</Text>
            </View>
          ))}
        </Accordion>

        {/* About */}
        <Accordion id="about" title="[A]  About Spend-na">
          <View style={{alignItems:'center', paddingVertical:20}}>
            <Image source={{uri:BIRD_96}} style={{width:72, height:72, marginBottom:12}} resizeMode="contain"/>
            <Text style={{fontSize:22, fontWeight:'900', color:C.brand, letterSpacing:-0.5}}>Spend-na</Text>
            <Text style={{fontSize:12, color:C.t4, marginTop:4}}>Version 1.0</Text>
            <View style={{width:40, height:1.5, backgroundColor:C.cardB, marginVertical:16}}/>
            <Text style={{fontSize:13, color:C.t2, textAlign:'center', lineHeight:21, marginBottom:8}}>
              Built with ♥ by Sandeep Hakki{'\n'}for every Indian who wants to{'\n'}understand where their money goes.
            </Text>
            <TouchableOpacity onPress={()=>Linking.openURL('http://www.hakki.in').catch(()=>{})}>
              <Text style={{fontSize:13, color:C.brand, fontWeight:'700', textDecorationLine:'underline'}}>
                www.hakki.in
              </Text>
            </TouchableOpacity>
            <Text style={{fontSize:11, color:C.t4, marginTop:16, textAlign:'center', lineHeight:18}}>
              © 2026 Sandeep Hakki{'\n'}All rights reserved{'\n'}Spend-na is a product of Hakki Consulting
            </Text>
          </View>
        </Accordion>

      </ScrollView>
    </View>
  );
};


// ═══════════════════════════════════════════════════════════
// BOTTOM TAB BAR
// ═══════════════════════════════════════════════════════════
const TabBar = ({active, onTab, pendingCount}: any) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const L = getLayout(width);

  const tabs = [
    {key:'Home',    label:'Wallet',  icon:'⬡'},
    {key:'Sort',    label:'Sort',    icon:'⇄'},
    {key:'MyMonth', label:'Month',   icon:'◎'},
    {key:'History', label:'History', icon:'≡'},
    {key:'ManualAdd',label:'Add',    icon:'+'},
  ];

  return (
    <View style={{
      backgroundColor:C.card,
      flexDirection:'row',
      paddingBottom: Math.max(insets.bottom, 8),
      paddingTop: 10,
      paddingLeft: Math.max(8, insets.left),
      paddingRight: Math.max(8, insets.right),
      borderTopWidth: 1, borderTopColor: C.cardB,
      shadowColor:'#000', shadowOffset:{width:0,height:-2},
      shadowOpacity:0.06, shadowRadius:8, elevation:8,
    }}>
      {tabs.map(t => {
        const isActive = active === t.key;
        const isAdd = t.key === 'ManualAdd';
        const showBadge = t.key === 'Sort' && pendingCount > 0;
        return (
          <TouchableOpacity key={t.key}
            style={{flex:1, alignItems:'center', gap:3}}
            onPress={()=>onTab(t.key)}
            hitSlop={{top:8, bottom:8, left:4, right:4}}>
            {isAdd ? (
              <View style={{width:42, height:42, borderRadius:21,
                backgroundColor: isActive ? C.brandD : C.brand,
                alignItems:'center', justifyContent:'center', marginTop:-14,
                shadowColor:C.brand, shadowOffset:{width:0,height:3},
                shadowOpacity:0.35, shadowRadius:6, elevation:6}}>
                <Text style={{fontSize:22, color:C.white, fontWeight:'300', lineHeight:26}}>+</Text>
              </View>
            ) : (
              <View style={{position:'relative'}}>
                <Text style={{fontSize:22, opacity: isActive ? 1 : 0.55}}>{t.icon}</Text>
                {showBadge && (
                  <View style={{position:'absolute', top:-4, right:-6, minWidth:16, height:16,
                    borderRadius:8, backgroundColor:C.lux, alignItems:'center',
                    justifyContent:'center', paddingHorizontal:3}}>
                    <Text style={{fontSize:9, fontWeight:'800', color:C.white}}>{pendingCount}</Text>
                  </View>
                )}
              </View>
            )}
            <Text style={{fontSize:10, fontWeight: isActive ? '700' : '500',
              color: isActive ? C.brand : C.t4}}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════
const AppContent = () => {
  const [screen, setScreen]               = useState<string>('Home');
  const [screenParams, setScreenParams]   = useState<any>({});
  const [isReady, setIsReady]             = useState(false);
  const [isOnboarded, setIsOnboarded]     = useState(false);
  const [profile, setProfile]             = useState<any>(DEFAULT_PROFILE);
  const [transactions, setTransactions]   = useState<any[]>([]);
  const [limits, setLimits]               = useState<any>(DEFAULT_LIMITS);
  const [settings, setSettings]           = useState<any>(DEFAULT_SETTINGS);
  const [resetKey, setResetKey]           = useState(0);

  // Respect phone sleep settings
  useEffect(()=>{
    if (Platform.OS === 'ios') {
      // Do NOT call any keep-awake API — let OS sleep normally
      // Metro dev server keeps screen awake in dev mode only
    }
  }, []);

  // Load all data on start
  useEffect(()=>{
    (async()=>{
      try {
        const [ob, prof, txns, lims, sett] = await Promise.all([
          store.get(KEYS.onboarded),
          store.get(KEYS.profile),
          store.get(KEYS.transactions),
          store.get(KEYS.limits),
          store.get(KEYS.settings),
        ]);

        if (ob) {
          setIsOnboarded(true);
          if (prof) setProfile(prof);
          if (lims) setLimits(lims);
          if (sett) setSettings(sett);

          // Load + validate transactions
          if (txns && Array.isArray(txns)) {
            const valid = txns
              .map(validateTransaction)
              .filter((t): t is any => t !== null);
            setTransactions(valid);
          }
        }
      } catch {
        // Storage failed — app starts fresh with defaults
      } finally {
        setIsReady(true);
      }
    })();
  }, [resetKey]);

  // Android back button handling
  useEffect(()=>{
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', ()=>{
      if (screen !== 'Home') { setScreen('Home'); return true; }
      return false;
    });
    return ()=>sub.remove();
  }, [screen]);

  const nav = useCallback((target: string, params?: any) => {
    setScreenParams(params || {});
    setScreen(target);
  }, []);

  // Classify transaction → moves to history, saves
  const handleClassify = useCallback(async (id: string, bucket: string) => {
    const updated = transactions.map(t => t.id===id ? {...t, bucket} : t);
    setTransactions(updated);
    await store.set(KEYS.transactions, updated);
    // Auto-backup silently
    store.set(KEYS.backup, createBackupPayload(updated, profile, limits));
  }, [transactions, profile, limits]);

  // Delete transaction
  const handleDelete = useCallback(async (id: string) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    await store.set(KEYS.transactions, updated);
  }, [transactions]);

  // Add manual transaction
  const handleAdd = useCallback(async (data: any) => {
    const now = new Date();
    const t = validateTransaction({
      id: `m_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      merchant: data.description || 'Manual Entry',
      amount: data.amount,
      time: now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'}),
      date: now.toLocaleDateString('en-IN',{day:'2-digit',month:'short'}),
      month: now.toLocaleDateString('en-IN',{month:'short',year:'numeric'}),
      bucket: data.bucket,
      source: 'manual',
    });
    if (!t) return;
    const updated = [t, ...transactions];
    setTransactions(updated);
    await store.set(KEYS.transactions, updated);
  }, [transactions]);

  const summary = calcSummary(transactions);
  const pending = transactions.filter(t => !t.bucket).length;

  if (!isReady) {
    return (
      <View style={{flex:1, backgroundColor:C.dark, alignItems:'center', justifyContent:'center'}}>
        <StatusBar barStyle="light-content"/>
        <Image source={{uri:BIRD_96}} style={{width:80, height:80}} resizeMode="contain"/>
        <Text style={{color:C.brand, fontSize:28, fontWeight:'900', marginTop:14, letterSpacing:-1}}>
          Spend-na
        </Text>
      </View>
    );
  }

  if (!isOnboarded) {
    return (
      <OnboardingScreen onDone={(prof:any, lims:any, txns:any) => {
        setProfile(prof); setLimits(lims); setTransactions(txns);
        setIsOnboarded(true); setScreen('Home');
      }}/>
    );
  }

  const tabScreens = ['Home','Sort','MyMonth','History','ManualAdd'];

  const renderScreen = () => {
    const commonProps = {nav, profile, transactions, limits, settings, summary};
    switch(screen) {
      case 'Home':
        return <HomeScreen {...commonProps}/>;
      case 'Sort':
        return <SortScreen {...commonProps} onClassify={handleClassify} onDelete={handleDelete}/>;
      case 'MyMonth':
        return <MyMonthScreen {...commonProps}/>;
      case 'SliceDetail':
        return <SliceDetailScreen nav={nav} bucket={screenParams.bucket} profile={profile}/>;
      case 'History':
        return <HistoryScreen transactions={transactions} onClassify={handleClassify} onDelete={handleDelete}/>;
      case 'ManualAdd':
        return <ManualAddScreen nav={nav} onAdd={handleAdd}/>;
      case 'Limits':
        return <LimitsScreen nav={nav} limits={limits} summary={summary}
          onSave={async (v:any)=>{ setLimits(v); await store.set(KEYS.limits, v); }}/>;
      case 'Settings':
        return <SettingsScreen
          nav={nav} profile={profile} settings={settings} limits={limits} transactions={transactions}
          onSaveProfile={(p:any)=>setProfile(p)}
          onSaveSettings={(s:any)=>setSettings(s)}
          onSaveLimits={async (v:any)=>{ setLimits(v); await store.set(KEYS.limits, v); }}
          onImport={(txns:any)=>setTransactions(txns)}
          onClearData={()=>{ setResetKey(k=>k+1); setIsOnboarded(false); setScreen('Home'); }}
        />;
      default:
        return <HomeScreen {...commonProps}/>;
    }
  };

  const showTabBar = tabScreens.includes(screen);

  return (
    <View style={{flex:1, backgroundColor:C.bg}}>
      <View style={{flex:1}}>
        {renderScreen()}
      </View>
      {showTabBar && (
        <TabBar
          active={screen}
          pendingCount={pending}
          onTab={(t:string)=>nav(t)}
        />
      )}
    </View>
  );
};

// ═══════════════════════════════════════════════════════════
// ROOT EXPORT
// ═══════════════════════════════════════════════════════════
const App = () => {
  const [resetKey, setResetKey] = useState(0);
  return (
    <SafeAreaProvider>
      <ErrorBoundary onReset={()=>setResetKey(k=>k+1)}>
        <AppContent key={resetKey}/>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
};

export default App;