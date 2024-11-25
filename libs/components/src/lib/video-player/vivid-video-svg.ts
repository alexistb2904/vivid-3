import { html } from '@microsoft/fast-element';

export function renderSvgIcons() {
	return html`
		<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
			<defs>
				<symbol viewBox="0 0 24 24" id="vjs-icon-play">
					<path
						fill="currentColor"
						d="M20.4359 10.8001L5.4049 0.30028C4.35273 -0.449705 2.99994 0.30028 2.99994 1.50026V22.4998C2.99994 23.6998 4.35273 24.4498 5.4049 23.6998L20.4359 13.2C21.1875 12.6 21.1875 11.4001 20.4359 10.8001Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-pause">
					<path
						fill="currentColor"
						d="M2.57143 1H7.42857C8.37143 1 9 1.62857 9 2.57143V21.4286C9 22.3714 8.37143 23 7.42857 23H2.57143C1.62857 23 1 22.3714 1 21.4286V2.57143C1 1.62857 1.62857 1 2.57143 1zM16.5714 1H21.4286C22.3714 1 23 1.62857 23 2.57143V21.4286C23 22.3714 22.3714 23 21.4286 23H16.5714C15.6286 23 15 22.3714 15 21.4286V2.57143C15 1.62857 15.6286 1 16.5714 1z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-audio">
					<path
						fill="currentColor"
						d="M4.57538 4.57538C6.54452 2.60625 9.21522 1.5 12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54452 22.5 9.21522 22.5 12V18.75C22.5 19.7445 22.1049 20.6984 21.4017 21.4017C20.6984 22.1049 19.7445 22.5 18.75 22.5H16.5V15H20.25C20.6642 15 21 14.6642 21 14.25C21 13.8358 20.6642 13.5 20.25 13.5H15.75C15.3358 13.5 15 13.8358 15 14.25V23.25C15 23.6642 15.3358 24 15.75 24H18.75C20.1425 24 21.4778 23.447 22.4624 22.4624C23.447 21.4778 24 20.1425 24 18.75V12C24 8.8174 22.7357 5.76516 20.4854 3.51472C18.2349 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12V18.75C0 20.1425 0.553124 21.4778 1.5377 22.4624C2.52225 23.447 3.85761 24 5.25 24H8.25C8.66421 24 9 23.6642 9 23.25V14.25C9 13.8358 8.66421 13.5 8.25 13.5H3.75C3.33579 13.5 3 13.8358 3 14.25C3 14.6642 3.33579 15 3.75 15H7.5V22.5H5.25C4.25544 22.5 3.3016 22.1049 2.59834 21.4017C1.89508 20.6984 1.5 19.7445 1.5 18.75V12C1.5 9.21522 2.60625 6.54452 4.57538 4.57538Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-captions">
					<path
						fill="currentColor"
						d="M23 3H1C0.734784 3 0.48043 3.10536 0.292893 3.29289C0.105357 3.48043 0 3.73478 0 4L0 20C0 20.2652 0.105357 20.5196 0.292893 20.7071C0.48043 20.8946 0.734784 21 1 21H23C23.2652 21 23.5196 20.8946 23.7071 20.7071C23.8946 20.5196 24 20.2652 24 20V4C24 3.73478 23.8946 3.48043 23.7071 3.29289C23.5196 3.10536 23.2652 3 23 3ZM9.215 14.3C9.55697 14.3006 9.8972 14.2514 10.225 14.154C10.5587 14.0553 10.8868 13.9388 11.208 13.805V15.6C10.5054 15.8994 9.74764 16.0476 8.984 16.035C8.48246 16.0682 7.97965 15.9933 7.50954 15.8154C7.03943 15.6375 6.61298 15.3608 6.259 15.004C5.57497 14.1672 5.2356 13.1012 5.31 12.023C5.29464 11.2827 5.45178 10.549 5.769 9.88C6.05743 9.2849 6.518 8.79018 7.091 8.46C7.71037 8.11652 8.40995 7.94395 9.118 7.96C9.96065 7.95842 10.7928 8.14747 11.552 8.513L10.902 10.183C10.6194 10.05 10.3284 9.93543 10.031 9.84C9.72993 9.74479 9.41576 9.69754 9.1 9.7C8.86618 9.69224 8.63434 9.7453 8.42716 9.85397C8.21997 9.96264 8.04454 10.1232 7.918 10.32C7.60852 10.835 7.4608 11.4311 7.494 12.031C7.492 13.5437 8.06567 14.3 9.215 14.3ZM16.353 14.3C16.695 14.3006 17.0352 14.2514 17.363 14.154C17.6967 14.0553 18.0248 13.9388 18.346 13.805V15.6C17.6434 15.8995 16.8856 16.0477 16.122 16.035C15.621 16.0677 15.1189 15.9927 14.6494 15.815C14.1798 15.6374 13.7538 15.3612 13.4 15.005C12.716 14.1682 12.3766 13.1022 12.451 12.024C12.4356 11.2837 12.5928 10.55 12.91 9.881C13.1975 9.28595 13.657 8.79091 14.229 8.46C14.8488 8.11666 15.5486 7.94411 16.257 7.96C17.0993 7.95854 17.9311 8.14759 18.69 8.513L18.04 10.183C17.7576 10.0502 17.467 9.93561 17.17 9.84C16.8676 9.74449 16.5521 9.69724 16.235 9.7C16.0012 9.69224 15.7693 9.7453 15.5622 9.85397C15.355 9.96264 15.1795 10.1232 15.053 10.32C14.7435 10.835 14.5958 11.4311 14.629 12.031C14.629 13.5437 15.2037 14.3 16.353 14.3Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-subtitles">
					<path
						fill="currentColor"
						d="M4.5 11.75C4.5 11.3358 4.83579 11 5.25 11H12.75C13.1642 11 13.5 11.3358 13.5 11.75 13.5 12.1642 13.1642 12.5 12.75 12.5H5.25C4.83579 12.5 4.5 12.1642 4.5 11.75zM17.25 11C16.8358 11 16.5 11.3358 16.5 11.75 16.5 12.1642 16.8358 12.5 17.25 12.5H18.75C19.1642 12.5 19.5 12.1642 19.5 11.75 19.5 11.3358 19.1642 11 18.75 11H17.25z"
					></path>
					<path
						fill="currentColor"
						fill-rule="evenodd"
						d="M6 18H1.5C0.671573 18 0 17.3284 0 16.5V3.5C0 2.67157 0.671573 2 1.5 2H22.5C23.3284 2 24 2.67157 24 3.5V16.5C24 17.3284 23.3284 18 22.5 18H14.8914L7.15523 23.8607C6.93463 24.021 6.64182 24.0448 6.3978 23.9223C6.15378 23.7998 6 23.5517 6 23.2807V18ZM1.5 3.5H22.5V16.5H14.8333C14.617 16.5 14.4064 16.5702 14.2333 16.7L12.5 18L7.5 21.8611V17C7.5 16.7239 7.27614 16.5 7 16.5H1.5V3.5Z"
						clip-rule="evenodd"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-fullscreen-enter">
					<path
						d="M0 2C0 .89543.89543 0 2 0H7.25391C7.66812 0 8.00391.335786 8.00391.75 8.00391 1.16421 7.66812 1.5 7.25391 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V7.25391C1.5 7.66812 1.16421 8.00391.75 8.00391.335786 8.00391 0 7.66812 0 7.25391V2zM24.0039 2C24.0039.89543 23.1085 0 22.0039 0H16.75C16.3358 0 16 .335786 16 .75 16 1.16421 16.3358 1.5 16.75 1.5H21.5039C22.0562 1.5 22.5039 1.94772 22.5039 2.5V7.25391C22.5039 7.66812 22.8397 8.00391 23.2539 8.00391 23.6681 8.00391 24.0039 7.66812 24.0039 7.25391V2zM0 22.0039C0 23.1085.89543 24.0039 2 24.0039H7.25391C7.66812 24.0039 8.00391 23.6681 8.00391 23.2539 8.00391 22.8397 7.66812 22.5039 7.25391 22.5039H2.5C1.94772 22.5039 1.5 22.0562 1.5 21.5039V16.75C1.5 16.3358 1.16421 16 .75 16 .335786 16 0 16.3358 0 16.75V22.0039zM24.0039 22.0039C24.0039 23.1085 23.1085 24.0039 22.0039 24.0039H16.75C16.3358 24.0039 16 23.6681 16 23.2539 16 22.8397 16.3358 22.5039 16.75 22.5039H21.5039C22.0562 22.5039 22.5039 22.0562 22.5039 21.5039V16.75C22.5039 16.3358 22.8397 16 23.2539 16 23.6681 16 24.0039 16.3358 24.0039 16.75V22.0039z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-fullscreen-exit">
					<path
						d="M9.00391 7.00368C9.00391 8.10825 8.10848 9.00368 7.00391 9.00368H.75C.335786 9.00368 0 8.6679 0 8.25368 0 7.83947.335786 7.50368.75 7.50368H6.50391C7.05619 7.50368 7.50391 7.05597 7.50391 6.50368V.76123C7.50391.347017 7.83969.0112305 8.25391.0112305 8.66812.0112305 9.00391.347017 9.00391.76123V7.00368zM15 7.00368C15 8.10825 15.8954 9.00368 17 9.00368H23.2539C23.6681 9.00368 24.0039 8.6679 24.0039 8.25368 24.0039 7.83947 23.6681 7.50368 23.2539 7.50368H17.5C16.9477 7.50368 16.5 7.05597 16.5 6.50368V.757812C16.5.343599 16.1642.0078125 15.75.0078125 15.3358.0078125 15 .343599 15 .757812V7.00368zM9.00391 16.9998C9.00391 15.8952 8.10848 14.9998 7.00391 14.9998H.75C.335786 14.9998 0 15.3356 0 15.7498 0 16.164.335786 16.4998.75 16.4998H6.50391C7.05619 16.4998 7.50391 16.9475 7.50391 17.4998V23.2537C7.50391 23.6679 7.83969 24.0037 8.25391 24.0037 8.66812 24.0037 9.00391 23.6679 9.00391 23.2537V16.9998zM15 16.9998C15 15.8952 15.8954 14.9998 17 14.9998H23.2539C23.6681 14.9998 24.0039 15.3356 24.0039 15.7498 24.0039 16.164 23.6681 16.4998 23.2539 16.4998H17.5C16.9477 16.4998 16.5 16.9475 16.5 17.4998V23.2537C16.5 23.6679 16.1642 24.0037 15.75 24.0037 15.3358 24.0037 15 23.6679 15 23.2537V16.9998z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-play-circle">
					<path
						fill="currentColor"
						d="M8.50004 15.5102C8.50004 16.752 9.47913 17.3659 10.5112 16.7714L16.7167 13.1972C17.7611 12.5957 17.7613 11.404 16.7167 10.8023L10.5112 7.22811C9.48125 6.63488 8.50004 7.25065 8.50004 8.48929V15.5102Z"
					></path>
					<path
						fill="currentColor"
						d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-volume-mute">
					<g fill="currentColor">
						<path
							d="M2.61446.448571C2.01637-.149524 1.04667-.149524.448571.448571-.149524 1.04667-.149524 2.01637.448571 2.61446L21.3855 23.5514C21.9836 24.1495 22.9533 24.1495 23.5514 23.5514 24.1495 22.9533 24.1495 21.9836 23.5514 21.3855L21.7015 19.5356C25.2843 14.2085 24.6784 6.96819 19.8846 2.28704 19.4976 1.90915 18.8645 1.90367 18.4704 2.27481 18.0764 2.64595 18.0707 3.25315 18.4577 3.63104 22.4688 7.54784 23.0734 13.5584 20.2716 18.1057L18.8867 16.7208C21.015 13.1012 20.497 8.39 17.3336 5.3009 16.9466 4.92301 16.3134 4.91753 15.9194 5.28867 15.5254 5.65981 15.5197 6.26701 15.9067 6.64491 18.2831 8.96544 18.7886 12.4445 17.4232 15.2573L15.9514 13.7855C16.6343 11.9405 16.2212 9.7883 14.7122 8.31476 14.3252 7.93687 13.6921 7.9314 13.2981 8.30253 12.904 8.67367 12.8983 9.28088 13.2853 9.65877 13.9683 10.3257 14.2962 11.2189 14.269 12.1031L10.9125 8.74665V3.45939C10.9125 3.04864 10.4092 2.82801 10.0853 3.09681L7.45005 5.28415 2.61446.448571zM2.98023e-8 9.97598C2.98023e-8 8.95153.739303 8.09646 1.72561 7.89151L10.9125 17.0784V20.5419C10.9125 20.9526 10.4092 21.1732 10.0853 20.9044L4.36502 16.1565H2.18251C.976673 16.1565 2.98023e-8 15.2028 2.98023e-8 14.0253V9.97598z"
						></path>
					</g>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-volume-low">
					<path
						fill="currentColor"
						d="M2.20549 7.74245H4.41097L10.1915 2.87784C10.5188 2.60243 11.0274 2.82848 11.0274 3.24933V20.7514C11.0274 21.1723 10.5188 21.3983 10.1915 21.1229L4.41097 16.2583H2.20549C0.986955 16.2583 0 15.2812 0 14.0748V9.926C0 8.71959 0.986955 7.74245 2.20549 7.74245ZM2.20549 9.21634H4.97582L9.51164 5.39924V18.6015L4.97582 14.7844H2.20549C1.84976 14.7844 1.51579 14.4923 1.51579 14.0748V9.926C1.51579 9.50843 1.84976 9.21634 2.20549 9.21634Z"
					></path>
					<path
						fill="currentColor"
						d="M14.6869 8.39634C14.3936 8.10596 13.9137 8.10175 13.6151 8.38694C13.3165 8.67213 13.3121 9.13873 13.6054 9.42911C15.0294 10.8389 15.0294 13.164 13.6054 14.5738C13.3121 14.8642 13.3165 15.3308 13.6151 15.616C13.9137 15.9012 14.3936 15.897 14.6869 15.6066C16.69 13.6234 16.69 10.3795 14.6869 8.39634Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-volume-medium">
					<path
						fill="currentColor"
						d="M2.20549 7.74245H4.41097L10.1915 2.87784C10.5188 2.60243 11.0274 2.82848 11.0274 3.24933V20.7514C11.0274 21.1723 10.5188 21.3983 10.1915 21.1229L4.41097 16.2583H2.20549C0.986955 16.2583 0 15.2812 0 14.0748V9.926C0 8.71959 0.986955 7.74245 2.20549 7.74245ZM2.20549 9.21634H4.97582L9.51164 5.39924V18.6015L4.97582 14.7844H2.20549C1.84976 14.7844 1.51579 14.4923 1.51579 14.0748V9.926C1.51579 9.50843 1.84976 9.21634 2.20549 9.21634Z"
					></path>
					<path
						fill="currentColor"
						d="M14.6869 8.39634C14.3936 8.10596 13.9137 8.10175 13.6151 8.38694 13.3165 8.67213 13.3121 9.13873 13.6054 9.42911 15.0294 10.8389 15.0294 13.164 13.6054 14.5738 13.3121 14.8642 13.3165 15.3308 13.6151 15.616 13.9137 15.9012 14.3936 15.897 14.6869 15.6066 16.69 13.6234 16.69 10.3795 14.6869 8.39634zM16.264 5.29905C16.5627 5.01386 17.0425 5.01806 17.3358 5.30844 21.0615 8.99714 21.0619 15.0042 17.3357 18.692 17.0424 18.9824 16.5625 18.9865 16.2639 18.7012 15.9653 18.416 15.9611 17.9494 16.2545 17.6591 19.4012 14.5448 19.4011 9.45667 16.2544 6.34121 15.9611 6.05083 15.9654 5.58424 16.264 5.29905z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-volume-high">
					<path
						fill="currentColor"
						d="M19.9137 2.22057C19.6204 1.93019 19.1405 1.92598 18.8419 2.21117C18.5433 2.49636 18.5389 2.96295 18.8322 3.25333C23.7015 8.07417 23.7015 15.9269 18.8323 20.7466C18.539 21.037 18.5432 21.5035 18.8418 21.7888C19.1404 22.074 19.6203 22.0698 19.9136 21.7795C25.3622 16.3863 25.362 7.6147 19.9137 2.22057Z"
					></path>
					<path
						fill="currentColor"
						d="M2.20549 7.74247H4.41097L10.1915 2.87786C10.5188 2.60245 11.0274 2.8285 11.0274 3.24935V20.7514C11.0274 21.1723 10.5188 21.3983 10.1915 21.1229L4.41097 16.2583H2.20549C0.986955 16.2583 0 15.2812 0 14.0748V9.92602C0 8.71961 0.986955 7.74247 2.20549 7.74247ZM2.20549 9.21637H4.97582L9.51164 5.39926V18.6015L4.97582 14.7844H2.20549C1.84976 14.7844 1.51579 14.4923 1.51579 14.0748V9.92602C1.51579 9.50845 1.84976 9.21637 2.20549 9.21637Z"
					></path>
					<path
						fill="currentColor"
						d="M14.6869 8.39636C14.3936 8.10598 13.9137 8.10177 13.6151 8.38696 13.3165 8.67215 13.3121 9.13875 13.6054 9.42913 15.0294 10.839 15.0294 13.164 13.6054 14.5739 13.3121 14.8642 13.3165 15.3308 13.6151 15.616 13.9137 15.9012 14.3936 15.897 14.6869 15.6066 16.69 13.6234 16.69 10.3796 14.6869 8.39636zM16.264 5.29907C16.5627 5.01388 17.0425 5.01808 17.3358 5.30846 21.0615 8.99716 21.0619 15.0042 17.3357 18.6921 17.0424 18.9824 16.5625 18.9865 16.2639 18.7013 15.9653 18.416 15.9611 17.9494 16.2545 17.6591 19.4012 14.5448 19.4011 9.45669 16.2544 6.34123 15.9611 6.05085 15.9654 5.58426 16.264 5.29907z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-spinner">
					<path
						d="M18.8 21l9.53-16.51C26.94 4.18 25.49 4 24 4c-4.8 0-9.19 1.69-12.64 4.51l7.33 12.69.11-.2zm24.28-3c-1.84-5.85-6.3-10.52-11.99-12.68L23.77 18h19.31zm.52 2H28.62l.58 1 9.53 16.5C41.99 33.94 44 29.21 44 24c0-1.37-.14-2.71-.4-4zm-26.53 4l-7.8-13.5C6.01 14.06 4 18.79 4 24c0 1.37.14 2.71.4 4h14.98l-2.31-4zM4.92 30c1.84 5.85 6.3 10.52 11.99 12.68L24.23 30H4.92zm22.54 0l-7.8 13.51c1.4.31 2.85.49 4.34.49 4.8 0 9.19-1.69 12.64-4.51L29.31 26.8 27.46 30z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-hd">
					<path
						d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 12H9.5v-2h-2v2H6V9h1.5v2.5h2V9H11v6zm2-6h4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1h-4V9zm1.5 4.5h2v-3h-2v3z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-chapters">
					<path
						d="M6 26h4v-4H6v4zm0 8h4v-4H6v4zm0-16h4v-4H6v4zm8 8h28v-4H14v4zm0 8h28v-4H14v4zm0-20v4h28v-4H14z"
					></path>
				</symbol>
				<symbol viewBox="0 0 40 40" id="vjs-icon-downloading">
					<path
						d="M18.208 36.875q-3.208-.292-5.979-1.729-2.771-1.438-4.812-3.729-2.042-2.292-3.188-5.229-1.146-2.938-1.146-6.23 0-6.583 4.334-11.416 4.333-4.834 10.833-5.5v3.166q-5.167.75-8.583 4.646Q6.25 14.75 6.25 19.958q0 5.209 3.396 9.104 3.396 3.896 8.562 4.646zM20 28.417L11.542 20l2.083-2.083 4.917 4.916v-11.25h2.916v11.25l4.875-4.916L28.417 20zm1.792 8.458v-3.167q1.833-.25 3.541-.958 1.709-.708 3.167-1.875l2.333 2.292q-1.958 1.583-4.25 2.541-2.291.959-4.791 1.167zm6.791-27.792q-1.541-1.125-3.25-1.854-1.708-.729-3.541-1.021V3.042q2.5.25 4.77 1.208 2.271.958 4.271 2.5zm4.584 21.584l-2.25-2.25q1.166-1.5 1.854-3.209.687-1.708.937-3.541h3.209q-.292 2.5-1.229 4.791-.938 2.292-2.521 4.209zm.541-12.417q-.291-1.833-.958-3.562-.667-1.73-1.833-3.188l2.375-2.208q1.541 1.916 2.458 4.208.917 2.292 1.167 4.75z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-file-download">
					<path
						d="M10.8 40.55q-1.35 0-2.375-1T7.4 37.15v-7.7h3.4v7.7h26.35v-7.7h3.4v7.7q0 1.4-1 2.4t-2.4 1zM24 32.1L13.9 22.05l2.45-2.45 5.95 5.95V7.15h3.4v18.4l5.95-5.95 2.45 2.45z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-file-download-done">
					<path
						d="M9.8 40.5v-3.45h28.4v3.45zm9.2-9.05L7.4 19.85l2.45-2.35L19 26.65l19.2-19.2 2.4 2.4z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-file-download-off">
					<path
						d="M4.9 4.75L43.25 43.1 41 45.3l-4.75-4.75q-.05.05-.075.025-.025-.025-.075-.025H10.8q-1.35 0-2.375-1T7.4 37.15v-7.7h3.4v7.7h22.05l-7-7-1.85 1.8L13.9 21.9l1.85-1.85L2.7 7zm26.75 14.7l2.45 2.45-3.75 3.8-2.45-2.5zM25.7 7.15V21.1l-3.4-3.45V7.15z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-share">
					<path
						d="M36 32.17c-1.52 0-2.89.59-3.93 1.54L17.82 25.4c.11-.45.18-.92.18-1.4s-.07-.95-.18-1.4l14.1-8.23c1.07 1 2.5 1.62 4.08 1.62 3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6c0 .48.07.95.18 1.4l-14.1 8.23c-1.07-1-2.5-1.62-4.08-1.62-3.31 0-6 2.69-6 6s2.69 6 6 6c1.58 0 3.01-.62 4.08-1.62l14.25 8.31c-.1.42-.16.86-.16 1.31A5.83 5.83 0 1 0 36 32.17z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-cog">
					<path
						d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3a14.8 14.8 0 0 0-3.38 1.97L9.9 10.1a1 1 0 0 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3a14.8 14.8 0 0 0 3.38-1.97l4.98 2.01a1 1 0 0 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-square">
					<path
						d="M36 8H12c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H12V12h24v24z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-circle">
					<circle cx="24" cy="24" r="20"></circle>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-circle-outline">
					<path
						d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-circle-inner-circle">
					<path
						d="M24 4C12.97 4 4 12.97 4 24s8.97 20 20 20 20-8.97 20-20S35.03 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm6-16c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-cancel">
					<path
						d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 27.17L31.17 34 24 26.83 16.83 34 14 31.17 21.17 24 14 16.83 16.83 14 24 21.17 31.17 14 34 16.83 26.83 24 34 31.17z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-replay">
					<path
						d="M24 10V2L14 12l10 10v-8c6.63 0 12 5.37 12 12s-5.37 12-12 12-12-5.37-12-12H8c0 8.84 7.16 16 16 16s16-7.16 16-16-7.16-16-16-16z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-repeat">
					<path
						d="M14 14h20v6l8-8-8-8v6H10v12h4v-8zm20 20H14v-6l-8 8 8 8v-6h24V26h-4v8z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-replay-5">
					<path
						fill="currentColor"
						d="M2.97803 6.3002L5.3102 8.57589C5.6383 8.89604 5.64474 9.42155 5.32458 9.74965 5.00443 10.0778 4.47892 10.0842 4.15082 9.76404L.43785 6.14098C.109752 5.82083.103311 5.29532.42346 4.96722.43061 4.9599.43786 4.95274.4452 4.94574L4.04252 1.251C4.36231.922554 4.88781.915534 5.21626 1.23533 5.54471 1.55512 5.55173 2.08062 5.23194 2.40907L3.00123 4.7002H22.8141C23.2372 4.7002 23.5802 5.05837 23.5802 5.5002V22.5002C23.5802 22.942 23.2221 23.3002 22.7802 23.3002H10.7802C10.3384 23.3002 9.9802 22.942 9.9802 22.5002 9.9802 22.0584 10.3384 21.7002 10.7802 21.7002H21.9802V6.3002H2.97803zM6.1509 13.9863V15.459H2.1899L1.8789 17.7695C2.4756 17.2554 3.1802 17.1094 3.8086 17.1094 5.6494 17.1094 6.7158 18.3535 6.7158 20.0166 6.7158 21.8447 5.4272 23.1016 3.4087 23.1016 1.6948 23.1016.4126 22.2065 0 20.7529L1.5488 20.3022C1.7964 21.1338 2.4438 21.6797 3.4087 21.6797 4.5322 21.6797 5.1035 20.9434 5.1035 20.061 5.1035 19.166 4.564 18.4741 3.5039 18.4741 2.793 18.4741 2.1899 18.7725 1.8154 19.1978L.3237 18.8232.9775 13.9863H6.1509z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-replay-10">
					<path
						fill="currentColor"
						d="M5.1227 8.57589L2.79053 6.3002H21.7927V21.7002H14.5927C14.1509 21.7002 13.7927 22.0584 13.7927 22.5002C13.7927 22.942 14.1509 23.3002 14.5927 23.3002H22.5927C23.0346 23.3002 23.3927 22.942 23.3927 22.5002V5.5002C23.3927 5.05837 23.0497 4.7002 22.6266 4.7002H22.5927H2.81373L5.04444 2.40907C5.36423 2.08062 5.35721 1.55512 5.02876 1.23533C4.70031 0.915534 4.17481 0.922554 3.85502 1.251L0.257699 4.94574C0.250355 4.95274 0.243108 4.9599 0.235964 4.96722C-0.0841892 5.29532 -0.0777482 5.82083 0.25035 6.14098L3.96332 9.76404C4.29142 10.0842 4.81693 10.0778 5.13708 9.74965C5.45724 9.42155 5.4508 8.89604 5.1227 8.57589ZM12.8096 18.2456C12.8096 15.3765 11.6162 13.834 9.39453 13.834C7.1792 13.834 5.98584 15.3765 5.98584 18.2456V18.6899C5.98584 21.5591 7.1792 23.1016 9.39453 23.1016C11.6162 23.1016 12.8096 21.5591 12.8096 18.6899V18.2456ZM7.5918 18.2266C7.5918 16.2207 8.18213 15.2939 9.39453 15.2939C10.6133 15.2939 11.2036 16.2207 11.2036 18.2266V18.709C11.2036 20.7148 10.6133 21.6416 9.39453 21.6416C8.18213 21.6416 7.5918 20.7148 7.5918 18.709V18.2266ZM3.85303 23V13.9863H2.52002C1.91064 14.7417 1.0918 15.2114 0.0571289 15.3828V17.0205C1.02832 16.8491 1.771 16.4873 2.27246 15.9604V23H3.85303Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-replay-30">
					<path
						fill="currentColor"
						d="M3.04151 6.3002L5.37368 8.57589C5.70178 8.89604 5.70822 9.42155 5.38806 9.74965C5.06791 10.0778 4.5424 10.0842 4.2143 9.76404L0.501327 6.14098C0.173228 5.82083 0.166787 5.29532 0.486941 4.96722C0.494085 4.9599 0.501332 4.95274 0.508676 4.94574L4.106 1.251C4.42579 0.922554 4.95129 0.915534 5.27974 1.23533C5.60819 1.55512 5.61521 2.08062 5.29542 2.40907L3.06471 4.7002H22.8776C23.3007 4.7002 23.6437 5.05837 23.6437 5.5002V22.5002C23.6437 22.942 23.2856 23.3002 22.8437 23.3002H17.8437C17.4019 23.3002 17.0437 22.942 17.0437 22.5002C17.0437 22.0584 17.4019 21.7002 17.8437 21.7002H22.0437V6.3002H3.04151Z"
					></path>
					<path
						fill="currentColor"
						d="M11.5845 13.834C13.8062 13.834 14.9995 15.3765 14.9995 18.2456V18.6899C14.9995 21.5591 13.8062 23.1016 11.5845 23.1016C9.36914 23.1016 8.17578 21.5591 8.17578 18.6899V18.2456C8.17578 15.3765 9.36914 13.834 11.5845 13.834ZM11.5845 15.2939C10.3721 15.2939 9.78174 16.2207 9.78174 18.2266V18.709C9.78174 20.7148 10.3721 21.6416 11.5845 21.6416C12.8032 21.6416 13.3936 20.7148 13.3936 18.709V18.2266C13.3936 16.2207 12.8032 15.2939 11.5845 15.2939Z"
					></path>
					<path
						fill="currentColor"
						d="M0.165039 13.9863H6.38574V15.4082L3.69434 17.7886C5.35107 17.7188 6.67139 18.6011 6.67139 20.2642C6.67139 21.9082 5.41455 23.1016 3.42139 23.1016C1.70117 23.1016 0.399902 22.2002 0 20.7529L1.54883 20.2896C1.75195 21.0894 2.39941 21.6797 3.40869 21.6797C4.39893 21.6797 5.06543 21.1338 5.06543 20.2832C5.06543 19.4834 4.4751 19.0264 3.47217 19.0264C3.03418 19.0264 2.56445 19.1152 2.25342 19.2104L1.51709 17.9727L4.34814 15.459H0.165039V13.9863Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-forward-5">
					<path
						fill="currentColor"
						d="M18.27 8.57589L20.6022 6.3002H1.6V21.7002H12.8C13.2418 21.7002 13.6 22.0584 13.6 22.5002 13.6 22.942 13.2418 23.3002 12.8 23.3002H.800001C.358171 23.3002 0 22.942 0 22.5002V5.5002C0 5.05837.342995 4.7002.766102 4.7002H20.579L18.3483 2.40907C18.0285 2.08062 18.0355 1.55512 18.364 1.23533 18.6924.915534 19.2179.922554 19.5377 1.251L23.135 4.94574C23.1424 4.95274 23.1496 4.9599 23.1568 4.96722 23.4769 5.29532 23.4705 5.82083 23.1424 6.14098L19.4294 9.76404C19.1013 10.0842 18.5758 10.0778 18.2556 9.74965 17.9355 9.42155 17.9419 8.89604 18.27 8.57589zM21.9634 13.9863V15.459H18.0024L17.6914 17.7695C18.2881 17.2554 18.9927 17.1094 19.6211 17.1094 21.4619 17.1094 22.5283 18.3535 22.5283 20.0166 22.5283 21.8447 21.2397 23.1016 19.2212 23.1016 17.5073 23.1016 16.2251 22.2065 15.8125 20.7529L17.3613 20.3022C17.6089 21.1338 18.2563 21.6797 19.2212 21.6797 20.3447 21.6797 20.916 20.9434 20.916 20.061 20.916 19.166 20.3765 18.4741 19.3164 18.4741 18.6055 18.4741 18.0024 18.7725 17.6279 19.1978L16.1362 18.8232 16.79 13.9863H21.9634z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-forward-10">
					<path
						fill="currentColor"
						d="M18.27 8.57589L20.6022 6.3002H1.6V21.7002H8.8C9.24183 21.7002 9.6 22.0584 9.6 22.5002C9.6 22.942 9.24183 23.3002 8.8 23.3002H0.800001C0.358171 23.3002 0 22.942 0 22.5002V5.5002C0 5.05837 0.342995 4.7002 0.766102 4.7002H0.800001H20.579L18.3483 2.40907C18.0285 2.08062 18.0355 1.55512 18.364 1.23533C18.6924 0.915534 19.2179 0.922554 19.5377 1.251L23.135 4.94574C23.1424 4.95274 23.1496 4.9599 23.1568 4.96722C23.4769 5.29532 23.4705 5.82083 23.1424 6.14098L19.4294 9.76404C19.1013 10.0842 18.5758 10.0778 18.2556 9.74965C17.9355 9.42155 17.9419 8.89604 18.27 8.57589ZM22.8095 18.2456C22.8095 15.3765 21.6161 13.834 19.3944 13.834C17.1791 13.834 15.9857 15.3765 15.9857 18.2456V18.6899C15.9857 21.5591 17.1791 23.1016 19.3944 23.1016C21.6161 23.1016 22.8095 21.5591 22.8095 18.6899V18.2456ZM17.5917 18.2266C17.5917 16.2207 18.182 15.2939 19.3944 15.2939C20.6132 15.2939 21.2035 16.2207 21.2035 18.2266V18.709C21.2035 20.7148 20.6132 21.6416 19.3944 21.6416C18.182 21.6416 17.5917 20.7148 17.5917 18.709V18.2266ZM13.8529 23V13.9863H12.5199C11.9105 14.7417 11.0917 15.2114 10.057 15.3828V17.0205C11.0282 16.8491 11.7709 16.4873 12.2724 15.9604V23H13.8529Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-forward-30">
					<path
						fill="currentColor"
						d="M18.27 8.57589L20.6022 6.3002H1.6V21.7002H5.8C6.2418 21.7002 6.6 22.0584 6.6 22.5002C6.6 22.942 6.2418 23.3002 5.8 23.3002H0.800001C0.358101 23.3002 0 22.942 0 22.5002V5.5002C0 5.05837 0.343 4.7002 0.7661 4.7002H20.579L18.3483 2.40907C18.0285 2.08062 18.0355 1.55512 18.3639 1.23533C18.6924 0.915534 19.2179 0.922554 19.5377 1.251L23.135 4.94574C23.1423 4.95274 23.1496 4.9599 23.1567 4.96722C23.4769 5.29532 23.4704 5.82083 23.1423 6.14098L19.4294 9.76404C19.1013 10.0842 18.5758 10.0778 18.2556 9.74965C17.9355 9.42155 17.9419 8.89604 18.27 8.57589Z"
					></path>
					<path
						fill="currentColor"
						d="M16.6442 18.2456C16.6442 15.3765 17.8375 13.834 20.0592 13.834C22.2745 13.834 23.4679 15.3765 23.4679 18.2456V18.6899C23.4679 21.5591 22.2745 23.1016 20.0592 23.1016C17.8375 23.1016 16.6442 21.5591 16.6442 18.6899V18.2456ZM21.8619 18.2266C21.8619 16.2207 21.2716 15.2939 20.0592 15.2939C18.8405 15.2939 18.2501 16.2207 18.2501 18.2266V18.709C18.2501 20.7148 18.8405 21.6416 20.0592 21.6416C21.2716 21.6416 21.8619 20.7148 21.8619 18.709V18.2266Z"
					></path>
					<path
						fill="currentColor"
						d="M14.3859 13.9863H8.16516V15.459H12.3483L9.51721 17.9727L10.2535 19.2104C10.5646 19.1152 11.0343 19.0264 11.4723 19.0264C12.4752 19.0264 13.0656 19.4834 13.0656 20.2832C13.0656 21.1338 12.399 21.6797 11.4088 21.6797C10.3995 21.6797 9.75208 21.0894 9.54895 20.2896L8.00012 20.7529C8.40002 22.2002 9.70129 23.1016 11.4215 23.1016C13.4147 23.1016 14.6715 21.9082 14.6715 20.2642C14.6715 18.6011 13.3512 17.7188 11.6945 17.7886L14.3859 15.4082V13.9863Z"
					></path>
				</symbol>
				<symbol viewBox="0 0 512 512" id="vjs-icon-audio-description">
					<g fill-rule="evenodd">
						<path
							d="M227.29 381.351V162.993c50.38-1.017 89.108-3.028 117.631 17.126 27.374 19.342 48.734 56.965 44.89 105.325-4.067 51.155-41.335 94.139-89.776 98.475-24.085 2.155-71.972 0-71.972 0s-.84-1.352-.773-2.568m48.755-54.804c31.43 1.26 53.208-16.633 56.495-45.386 4.403-38.51-21.188-63.552-58.041-60.796v103.612c-.036 1.466.575 2.22 1.546 2.57"
						></path>
						<path
							d="M383.78 381.328c13.336 3.71 17.387-11.06 23.215-21.408 12.722-22.571 22.294-51.594 22.445-84.774.221-47.594-18.343-82.517-35.6-106.182h-8.51c-.587 3.874 2.226 7.315 3.865 10.276 13.166 23.762 25.367 56.553 25.54 94.194.2 43.176-14.162 79.278-30.955 107.894"
						></path>
						<path
							d="M425.154 381.328c13.336 3.71 17.384-11.061 23.215-21.408 12.721-22.571 22.291-51.594 22.445-84.774.221-47.594-18.343-82.517-35.6-106.182h-8.511c-.586 3.874 2.226 7.315 3.866 10.276 13.166 23.762 25.367 56.553 25.54 94.194.2 43.176-14.162 79.278-30.955 107.894"
						></path>
						<path
							d="M466.26 381.328c13.337 3.71 17.385-11.061 23.216-21.408 12.722-22.571 22.292-51.594 22.445-84.774.221-47.594-18.343-82.517-35.6-106.182h-8.51c-.587 3.874 2.225 7.315 3.865 10.276 13.166 23.762 25.367 56.553 25.54 94.194.2 43.176-14.162 79.278-30.955 107.894M4.477 383.005H72.58l18.573-28.484 64.169-.135s.065 19.413.065 28.62h48.756V160.307h-58.816c-5.653 9.537-140.85 222.697-140.85 222.697zm152.667-145.282v71.158l-40.453-.27 40.453-70.888z"
						></path>
					</g>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-next-item">
					<path d="M12 36l17-12-17-12v24zm20-24v24h4V12h-4z"></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-previous-item">
					<path d="M12 12h4v24h-4zm7 12l17 12V12z"></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-shuffle">
					<path
						d="M21.17 18.34L10.83 8 8 10.83l10.34 10.34 2.83-2.83zM29 8l4.09 4.09L8 37.17 10.83 40l25.09-25.09L40 19V8H29zm.66 18.83l-2.83 2.83 6.26 6.26L29 40h11V29l-4.09 4.09-6.25-6.26z"
					></path>
				</symbol>
				<symbol viewBox="0 0 48 48" id="vjs-icon-cast">
					<path
						d="M42 6H6c-2.21 0-4 1.79-4 4v6h4v-6h36v28H28v4h14c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM2 36v6h6c0-3.31-2.69-6-6-6zm0-8v4c5.52 0 10 4.48 10 10h4c0-7.73-6.27-14-14-14zm0-8v4c9.94 0 18 8.06 18 18h4c0-12.15-9.85-22-22-22z"
					></path>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-picture-in-picture-enter">
					<path
						d="M12 12C11.4477 12 11 12.4477 11 13V17C11 17.5523 11.4477 18 12 18H20C20.5523 18 21 17.5523 21 17V13C21 12.4477 20.5523 12 20 12H12Z"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0 5C0 3.89543 0.895431 3 2 3H22C23.1046 3 24 3.89543 24 5V19C24 20.1046 23.1046 21 22 21H2C0.89543 21 0 20.1046 0 19V5ZM2 4.5H22C22.2761 4.5 22.5 4.72386 22.5 5V19C22.5 19.2761 22.2761 19.5 22 19.5H2C1.72386 19.5 1.5 19.2761 1.5 19V5C1.5 4.72386 1.72386 4.5 2 4.5Z"
					/>
				</symbol>
				<symbol viewBox="0 0 24 24" id="vjs-icon-picture-in-picture-exit">
					<path
						d="M3.5 6C3.22386 6 3 6.22386 3 6.5V17.5C3 17.7761 3.22386 18 3.5 18H20.5C20.7761 18 21 17.7761 21 17.5V6.5C21 6.22386 20.7761 6 20.5 6H3.5Z"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0 5C0 3.89543 0.895431 3 2 3H22C23.1046 3 24 3.89543 24 5V19C24 20.1046 23.1046 21 22 21H2C0.89543 21 0 20.1046 0 19V5ZM2 4.5H22C22.2761 4.5 22.5 4.72386 22.5 5V19C22.5 19.2761 22.2761 19.5 22 19.5H2C1.72386 19.5 1.5 19.2761 1.5 19V5C1.5 4.72386 1.72386 4.5 2 4.5Z"
					/>
				</symbol>
				<symbol viewBox="0 0 1792 1792" id="vjs-icon-facebook">
					<path
						d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759H734V905H479V609h255V391q0-186 104-288.5T1115 0q147 0 228 12z"
					></path>
				</symbol>
				<symbol viewBox="0 0 1792 1792" id="vjs-icon-linkedin">
					<path
						d="M477 625v991H147V625h330zm21-306q1 73-50.5 122T312 490h-2q-82 0-132-49t-50-122q0-74 51.5-122.5T314 148t133 48.5T498 319zm1166 729v568h-329v-530q0-105-40.5-164.5T1168 862q-63 0-105.5 34.5T999 982q-11 30-11 81v553H659q2-399 2-647t-1-296l-1-48h329v144h-2q20-32 41-56t56.5-52 87-43.5T1285 602q171 0 275 113.5t104 332.5z"
					></path>
				</symbol>
				<symbol viewBox="0 0 1792 1792" id="vjs-icon-twitter">
					<path
						d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5T1369.5 1125 1185 1335.5t-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5T285 1033q33 5 61 5 43 0 85-11-112-23-185.5-111.5T172 710v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5T884 653q-8-38-8-74 0-134 94.5-228.5T1199 256q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z"
					></path>
				</symbol>
				<symbol viewBox="0 0 1792 1792" id="vjs-icon-tumblr">
					<path
						d="M1328 1329l80 237q-23 35-111 66t-177 32q-104 2-190.5-26T787 1564t-95-106-55.5-120-16.5-118V676H452V461q72-26 129-69.5t91-90 58-102 34-99T779 12q1-5 4.5-8.5T791 0h244v424h333v252h-334v518q0 30 6.5 56t22.5 52.5 49.5 41.5 81.5 14q78-2 134-29z"
					></path>
				</symbol>
				<symbol viewBox="0 0 1792 1792" id="vjs-icon-pinterest">
					<path
						d="M1664 896q0 209-103 385.5T1281.5 1561 896 1664q-111 0-218-32 59-93 78-164 9-34 54-211 20 39 73 67.5t114 28.5q121 0 216-68.5t147-188.5 52-270q0-114-59.5-214T1180 449t-255-63q-105 0-196 29t-154.5 77-109 110.5-67 129.5T377 866q0 104 40 183t117 111q30 12 38-20 2-7 8-31t8-30q6-23-11-43-51-61-51-151 0-151 104.5-259.5T904 517q151 0 235.5 82t84.5 213q0 170-68.5 289T980 1220q-61 0-98-43.5T859 1072q8-35 26.5-93.5t30-103T927 800q0-50-27-83t-77-33q-62 0-105 57t-43 142q0 73 25 122l-99 418q-17 70-13 177-206-91-333-281T128 896q0-209 103-385.5T510.5 231 896 128t385.5 103T1561 510.5 1664 896z"
					></path>
				</symbol>
			</defs>
		</svg>
	`;
}
