'use client'
import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  	/*--- RESET/NORMALIZE ---*/
	body, h1, h2, h3, h4, h5, h6, figure, pre, dl, dd, blockquote, input[type="radio"], input[type="checkbox"] {margin:0}
	legend {padding:0}
	fieldset, ul, ol {padding:0;margin:0}
	ul, ol {list-style:none}
	body {line-height:1}
	main, figure, figcaption, img {display:block} /*--- <main> for IE 11 ---*/
	img {max-width:100%;height:auto}
	a {text-decoration:none;color:cyan}
	fieldset {border:0}
	input, textarea, select, button {display:block;max-width:100%;font-family:inherit;font-size:inherit;color:inherit;border:none;outline:none;background:none}
	label {display:table}
	input[type="text"], input[type="email"], input[type="password"], input[type="search"] {-webkit-appearance:none} /*--- for Safari (add/remove types as needed) ---*/
	button {line-height:inherit}
	button::-moz-focus-inner {border:0} /*--- for Firefox ---*/
	html {text-size-adjust:100%;-webkit-text-size-adjust:100%;font-size:1.25em}

	html {
		font-family: var(--font-poppins);
	}
`

export default function StyledComponentsRegistry({
	children,
}: {
	children: React.ReactNode
}) {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement()
		styledComponentsStyleSheet.instance.clearTag()
		return <>{styles}</>
	})

	if (typeof window !== 'undefined') return <>{children}</>

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			<GlobalStyle />
			{children}
		</StyleSheetManager>
	)
}
