import React from 'react'
import Router from 'next/router'

import { ButtonWithIcon } from '@/components/Button'
import { CaretLeft } from 'phosphor-react'

import styles from './Document.module.sass'


const Document = ({ title, children }: { title?: string, children?: React.ReactNode }) => {

	function goBack() {
		Router.back()
	}

	return (
		<div
			className={styles.Document}
		>
			<ButtonWithIcon onClick={goBack} iconLeft={
				<CaretLeft size={24} weight={'bold'} />
			}>
				Indietro
				</ButtonWithIcon>
			<h1>
				{title}
			</h1>
			<div className={styles.Content}>
				{children}
			</div>
		</div>
	)
}

export default Document
