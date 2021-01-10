import React, { useContext } from 'react'
import { GlobalContext } from '@/components/GlobalContext'


const SingleRegion: React.FC = () => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	return (
		<>
			qui singola pagina
		</>
	)
}

export default SingleRegion
