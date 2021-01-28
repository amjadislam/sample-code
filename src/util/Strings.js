import * as React from 'react';
import {I18nManager, Text} from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';





export function loadLocalization(){

    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: { until: 'Until', prayer: 'Prayer' , fajar:'Fajar',
            sunrise:'Sunrise',dhuhr:'Dhuhr', asr:'Asr', maghrib:'Maghrib', isha:'Isha',
            change_location:'Change Location',next_islamic_events:"Next Islamic Events",
            pick_location:'Pick Location',back_to_list:'Back to list',surahs_list:'Surahs List',
            setting:'Setting',fajr_prayer:'Fajr Prayer',dhuhr_prayer:'Dhuhr Prayer',
            asar_prayer:'Asar Prayer',maghrib_prayer:'Maghrib Prayer',isha_prayer:'Isha Prayer',
            translation:'Translation',meanings:'Meanings',noIslamicEvent:'No Islamic event in this month.',
            home:'Home',qiblaFounder:'Head of Qibla',quran:'Quran', calendar:'Calendar',tasbih:'Tasbih',
            january:'January', february:'February', march:'March', april:'April', may:'May', june:'June',
            july:'July', august:'August', september:'September', october:'October', november:'November',
            december:'December',itsTimeToPray:'it\'s time to pray'

        },
        pt: { until: 'Até', prayer: 'Oração' , fajar:'Alvorada',
            sunrise:'Nascimento do sol',dhuhr:'Dhuhr', asr:'Asr', maghrib:'Maghrib', isha:'Inshaa',
            change_location:'Alterar a localização  ',next_islamic_events:'Próximos eventos islâmicos',
            pick_location:'Selecionar a localização',back_to_list:'Voltar à lista',surahs_list:'Lista das Suratas',
            setting:'Configurações',fajr_prayer:'Oração de Fajr',dhuhr_prayer:'Oração de Dhuhr',
            asar_prayer:'Oração de Asr ',maghrib_prayer:'Oração de Maghrib',isha_prayer:'Oração de Inshaa',
            translation:'Tradução',meanings:'Significado ',noIslamicEvent:'Nenhum evento islâmico neste mês.',
            home:'Casa',qiblaFounder:'Direção de Qibla',quran:'Alcorão', calendar:'Calendário',tasbih:'Tasbih',
            january:'Janeiro', february:'Fevereiro', march:'Março', april:'Abril', may:'Maio', june:'Junho',
            july:'Julho', august:'Agosto', september:'Setembro', october:'Outubro', november:'Novembro',
            december:'Dezembro',itsTimeToPray:'é hora de orar'

        },
    };
// Set the locale once at the beginning of your app.

    //i18n.locale = Localization.locale;
    i18n.locale = 'pt';
    I18nManager.allowRTL(false);

// When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;

}
