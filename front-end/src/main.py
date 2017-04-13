import requests

from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.config import Config

Config.set('graphics', 'width', '400')
Config.set('graphics', 'height', '600')

Builder.load_string("""
<MenuScreen>:
    BoxLayout:
    	orientation: 'vertical'
    	padding: [10,50,10,50]
    	spacing: 50
    	Label:
			text: "Feli'CITY"
			font_size: 50
        Button:
            text: 'Se connecter'
            font_size: 26
            on_press:
                root.manager.current = 'login'
        Button:
            text: "S'inscrire"
            font_size: 26
        Button:
        	text: "Visiter l'application"
        	font_size: 26
        	on_press:
        		root.manager.current = 'gamemode'
            	root.manager.transition.direction = 'left'

<GameModeScreen>:
    BoxLayout:
    	orientation: 'vertical'
    	padding: [10,50,10,50]
    	spacing: 50
    	Label:
    		text: "Choisis ton mode de jeu !"
    		font_size: 34
        Button:
            text: "Mode détente"
            font_size: 26
        Button:
            text: "Mode compétitif"
            font_size: 26
        Button:
            text: 'Back to menu'
            font_size: 26
            on_press:
            	root.manager.current = 'menu'
            	root.manager.transition.direction ='right'

<LoginScreen>:
    BoxLayout
        id: login_layout
        orientation: 'vertical'
        padding: [10,50,10,50]
        spacing: 50

        Label:
            text: "Login"
            font_size: 32

        BoxLayout:
            orientation: "vertical"

            Label:
                text: "Pseudo"
                font_size: 18
                halign: 'left'
                text_size: root.width-20, 20

            TextInput:
                id: login
                multiline:False
                font_size: 28

        BoxLayout:
            orientation: 'vertical'
            Label:
                text: "Mot de passe"
                halign: "left"
                font_size: 18
                text_size: root.width-20, 20

            TextInput:
                id: password
                multiline:False
                password:True
                font_size: 28

        Button:
            text: "Connexion"
            font_size: 24

            on_press: root.do_login(login.text, password.text)


<LoginErrorScreen>:
    Label:
        text: "L'authentification a échoué !"
        font_size: 24

""")

# Declare both screens
class MenuScreen(Screen):
    pass

class GameModeScreen(Screen):
    pass

class LoginScreen(Screen):
    def do_login(self, loginText, passwordText):
        try:
            r = requests.post('http://localhost:8080/authentificate', data={'pseudo':loginText, 'mdp':passwordText})
            if r.status_code == 200:
                token = r.json()['token']
                self.manager.current = 'gamemode'
            else:
                self.manager.current = 'loginError'
        except:
            raise
            self.manager.current = 'loginError'
            

    def resetForm(self):
        self.ids['login'].text = ""
        self.ids['password'].text = ""

class LoginErrorScreen(Screen):
    pass

# Create the screen manager
sm = ScreenManager()
sm.add_widget(MenuScreen(name='menu'))
sm.add_widget(LoginScreen(name='login'))
sm.add_widget(LoginErrorScreen(name='loginError'))
sm.add_widget(GameModeScreen(name='gamemode'))

class TestApp(App):

    def build(self):
        return sm

if __name__ == '__main__':
    TestApp().run()
