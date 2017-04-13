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

""")

# Declare both screens
class MenuScreen(Screen):
    pass

class GameModeScreen(Screen):
    pass

# Create the screen manager
sm = ScreenManager()
sm.add_widget(MenuScreen(name='menu'))
sm.add_widget(GameModeScreen(name='gamemode'))

class TestApp(App):

    def build(self):
        return sm

if __name__ == '__main__':
    TestApp().run()
