import * as videoPlayerLocale from 'video.js/dist/lang/ja.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const jaJP: Locale = {
	lang: 'ja-JP',
	common: {
		useCommaAsDecimalSeparator: false,
	},
	datePicker: {
		months: {
			name: [
				'1月',
				'2月',
				'3月',
				'4月',
				'5月',
				'6月',
				'7月',
				'8月',
				'9月',
				'10月',
				'11月',
				'12月',
			],
			shorthand: [
				'1月',
				'2月',
				'3月',
				'4月',
				'5月',
				'6月',
				'7月',
				'8月',
				'9月',
				'10月',
				'11月',
				'12月',
			],
		},
		weekdays: {
			name: [
				'日曜日',
				'月曜日',
				'火曜日',
				'水曜日',
				'木曜日',
				'金曜日',
				'土曜日',
			],
			shorthand: ['日', '月', '火', '水', '木', '金', '土'],
		},
		firstDayOfWeek: 0,
		dateFormat: 'yyyy年MM月dd日',
		dateFormatPlaceholder: 'YYYY年MM月DD日',
		chooseDateLabel: '日付を選択',
		changeDateLabel: /* istanbul ignore next */ (date: string) =>
			`日付を変更, ${date}`,
		chooseDatesLabel: '日付を選択',
		changeDatesLabel: /* istanbul ignore next */ (range: string) =>
			`日付を変更, ${range}`,
		prevYearLabel: '前年',
		prevMonthLabel: '前月',
		nextMonthLabel: '次月',
		nextYearLabel: '翌年',
		clearLabel: 'クリア',
		okLabel: 'OK',
		invalidDateError: '有効な日付を入力してください。',
		invalidDateRangeError: '有効な日付範囲を入力してください。',
		startDateAfterMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`開始日は${minDate}以降である必要があります。`,
		endDateBeforeMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`終了日は${maxDate}以前である必要があります。`,
	},
	timePicker: {
		defaultTo12HourClock: false,
		chooseTimeLabel: '時間を選択',
		changeTimeLabel: /* istanbul ignore next */ (time: string) =>
			`時間を変更, ${time}`,
		hoursLabel: '時間',
		minutesLabel: '分',
		secondsLabel: '秒',
		meridiesLabel: '午前/午後',
		clearLabel: 'クリア',
		okLabel: 'OK',
		invalidTimeError: '有効な時間を入力してください。',
	},
	filePicker: {
		invalidFileTypeError: 'この種類のファイルは選択できません。',
		maxFilesExceededError: 'これ以上ファイルを選択できません。',
		fileTooBigError:
			'ファイルが大きすぎます ({{filesize}}MiB)。最大ファイルサイズ: {{maxFilesize}}MiB。',
		removeFileLabel: 'ファイルを削除',
	},
	audioPlayer: {
		playButtonLabel: '開始',
		pauseButtonLabel: '休止',
		sliderLabel: 'オーディオプログレスバー',
		skipForwardButton: '前にスキップ',
		skipBackwardButton: '後方にスキップ',
	},
	alert: {
		dismissButtonLabel: '閉じる',
	},
	dialog: {
		dismissButtonLabel: '閉じる',
	},
	banner: {
		dismissButtonLabel: '閉じる',
	},
	numberField: {
		incrementButtonLabel: '増加',
		decrementButtonLabel: '減少',
	},
	splitButton: {
		showMoreActionsLabel: 'その他の操作を表示',
	},
	videoPlayer: videoPlayerLocale,
	rangeSlider: {
		startThumbLabel: '最小',
		endThumbLabel: '最大',
	},
	dialPad: {
		inputLabel: '電話番号',
		deleteButtonLabel: '消去',
		callButtonLabel: '電話',
		endCallButtonLabel: '通話終了',
		digitOneLabel: '1',
		digitTwoLabel: '2 ABC',
		digitThreeLabel: '3 DEF',
		digitFourLabel: '4 GHI',
		digitFiveLabel: '5 JKL',
		digitSixLabel: '6 MNO',
		digitSevenLabel: '7 PQRS',
		digitEightLabel: '8 TUV',
		digitNineLabel: '9 WXYZ',
		digitAsteriskLabel: '*',
		digitZeroLabel: '0',
		digitHashtagLabel: '#',
	},
	searchableSelect: {
		clearButtonLabel: 'クリア',
		noOptionsMessage: 'オプションがありません',
		noMatchesMessage: 'オプションが見つかりません',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`${label}を削除`,
	},
};

export default jaJP;
