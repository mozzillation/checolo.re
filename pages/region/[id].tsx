import React, { useContext } from 'react'
import { GlobalContext } from '@component/GlobalContext'
import Flex from '@component/Flex'

const SingleRegion: React.FC = () => {

	const [globalContext, dispatch] = useContext(GlobalContext)

	return (
		<Flex>
			Lombardia
		</Flex>
	)
}

export default SingleRegion
