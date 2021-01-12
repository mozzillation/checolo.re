import React, { useContext } from 'react'
import { GlobalContext } from '@component/GlobalContext'
import Flex from '@component/Flex'
import { Footer } from '@/components/Footer/Footer'


const SingleRegion: React.FC = () => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	return (<>
		<Flex>
			Lombardia
		</Flex>
		<Footer />
	</>
	)
}

export default SingleRegion
