import React, { useContext } from 'react'
import { GlobalContext } from '@/components/GlobalContext'
import { Footer } from '@/components/Footer/Footer'


const SingleRegion: React.FC = () => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	return (
		<>
			qui singola pagina
			<Footer />
		</>
	)
}

export default SingleRegion
