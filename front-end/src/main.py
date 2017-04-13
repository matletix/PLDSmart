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
        Button:
            text: "S'inscrire"
            font_size: 26
        Button:
        	text: "Visiter l'application"
        	font_size: 26
        	on_press:
        		root.visit_Appli()

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
            on_press: 
                root.chill_mode()
        Button:
            text: "Mode compétitif"
            font_size: 26
        Button:
            text: "Retour"
            font_size: 20
            on_press:
            	root.back_to_menu()
<ChillScreen>:
	BoxLayout:
		orientation: 'vertical'
    	padding: [10,50,10,50]
    	spacing: 30
    	Label:
    		text: "Mode détente"
    		font_size: 34
		Label:
			text: "Choisis ton niveau !"
            font_size: 30
        Button:
            text: "Niveau 1"
            font_size: 26
        Button:
            text: "Niveau 2"
            font_size: 26
        Button:
            text: "Niveau 3"
            font_size: 26
        Button:
            text: "Retour"
            font_size: 20
            on_press:
                root.back_to_menu()

""")

# Declaration des screens
class MenuScreen(Screen):
    def visit_Appli(self):
        self.manager.current = 'gamemode'
        self.manager.transition.direction = 'left'

class GameModeScreen(Screen):
    def back_to_menu(self):
        self.manager.current = 'menu'
        self.manager.transition.direction ='right'
    def chill_mode(self):
        self.manager.current = 'chillScreen'
        self.manager.transition.direction ='left'

class ChillScreen(Screen):
    def back_to_menu(self):
        self.manager.current = 'gamemode'
        self.manager.transition.direction ='right'

# Creation du screenmanager
sm = ScreenManager()
sm.add_widget(MenuScreen(name='menu'))
sm.add_widget(GameModeScreen(name='gamemode'))
sm.add_widget(ChillScreen(name='chillScreen'))

class TestApp(App):

    def build(self):
        return sm

if __name__ == '__main__':
    TestApp().run()
