/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
/**
 * Internal dependencies
 */
import BoxControl from '../';
import BoxControlIcon from '../icon';
import BoxControlVisualizer from '../visualizer';
import { Flex, FlexBlock } from '../../flex';

export default { title: 'Components/BoxControl', component: BoxControl };

export const _default = () => {
	return <BoxControl />;
};

export const icon = () => {
	return <BoxControlIcon />;
};

function DemoExample() {
	const [ values, setValues ] = useState( {
		top: [ 10 ],
		right: [ 10 ],
		bottom: [ 10 ],
		left: [ 10 ],
	} );

	return (
		<Container align="top" gap={ 8 }>
			<FlexBlock>
				<Content>
					<BoxControl
						label="Padding"
						values={ values }
						onChange={ setValues }
					/>
				</Content>
			</FlexBlock>
			<FlexBlock>
				<Content>
					<BoxContainer>
						<BoxControlVisualizer values={ values }>
							<Box />
						</BoxControlVisualizer>
					</BoxContainer>
				</Content>
			</FlexBlock>
		</Container>
	);
}

export const demo = () => {
	return <DemoExample />;
};

const Container = styled( Flex )`
	max-width: 780px;
`;

const BoxContainer = styled.div`
	width: 300px;
	height: 300px;
`;

const Box = styled.div`
	background: #ddd;
	height: 300px;
`;

const Content = styled.div`
	padding: 20px;
`;
