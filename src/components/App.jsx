import React, {PropTypes} from 'react';

import {
	Framework7App, Statusbar, Panel, View, Navbar, Pages, Page, ContentBlock, ContentBlockTitle,
	List, ListItem, Views, NavLeft, Link, NavCenter, NavRight, GridRow, GridCol, Button, Popup,
	LoginScreen, LoginScreenTitle, ListButton, ListLabel, FormLabel, FormInput, Toolbar, Tabs, Tab,
} from 'framework7-react';

import {routes} from '../routes';

import {Browse} from './pages/Browse';


const LeftPanel = (props, context) => (
	<Panel left reveal layout="dark">
		<View id="left-panel-view" navbarThrough dynamicNavbar="true">
			{context.framework7AppContext.theme.ios ? <Navbar title="Left Panel"></Navbar> : null}
			<Pages>
				<Page>
					{context.framework7AppContext.theme.material ? <Navbar title="Left Panel"></Navbar> : null}
					<List>
						<ListItem link="/mybooks/" title="MyBooks" linkView="#main-view" linkClosePanel></ListItem>
						<ListItem link="/form/" title="Settings" linkView="#main-view" linkClosePanel></ListItem>
						<ListItem link="/details/tomclancysnetfor00clan_2/" title="Details test" linkView="#main-view" linkClosePanel></ListItem>

						<ListItem title=""><Button openLoginScreen="#login-screen">Login Screen</Button></ListItem>
					</List>
				</Page>
			</Pages>
		</View>
	</Panel>
);

LeftPanel.contextTypes = {
	framework7AppContext: PropTypes.object
};

const MainViews = (props, context) => {
	return (
		<Views>
			<View id="main-view" navbarThrough dynamicNavbar={true} main url="/">
				{/* Navbar */}
				{context.framework7AppContext.theme.ios ? (
					<Navbar>
						<NavLeft>
							<Link icon="icon-bars" openPanel="left" />
						</NavLeft>
						<NavCenter sliding>Open Library Lite</NavCenter>
					</Navbar>
				) : null}
				{/* Pages */}
				<Pages>
					<Browse />
				</Pages>
			</View>
		</Views>
	);
};

MainViews.contextTypes = {
	framework7AppContext: PropTypes.object
};

const AppLoginScreen = () => (
	<LoginScreen id="login-screen">
		<View>
			<Pages>
				<Page loginScreen>
					<Navbar title="Login">
						<NavRight>
							<Link closeLoginScreen>Close</Link>
						</NavRight>
					</Navbar>
					<br/>
					<br/>
					<List form>
						<ListItem>
							<FormLabel>Username</FormLabel>
							<FormInput name="username" placeholder="Username" type="text" />
						</ListItem>
						<ListItem>
							<FormLabel>Password</FormLabel>
							<FormInput name="password" type="password" placeholder="Password" />
						</ListItem>
					</List>
					<List>
						<ListButton title="Sign In" closeLoginScreen />
						<ListLabel>
							<p>Click Sign In to close Login Screen</p>
						</ListLabel>
					</List>
				</Page>
			</Pages>
		</View>
	</LoginScreen>
);

export const App = () => (
	//Change themeType to "material" to use the Material theme
	<Framework7App themeType="ios" routes={routes}>
		<Statusbar />
		<LeftPanel />
		<MainViews />
		<AppLoginScreen />
	</Framework7App>
);
