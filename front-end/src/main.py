from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.config import Config

Config.set('graphics', 'width', '400')
Config.set('graphics', 'height', '600')
import mapview

Builder.load_string("""
#:import sys sys
#:import MapSource mapview.MapSource
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
            on_press:
                root.level_1()
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

<Level_1_Screen>
    BoxLayout:
        orientation: 'vertical'
        padding: [10,50,10,50]
        spacing: 30
        Label:
            text: "Niveau 1"
            font_size: 34
        Label:
            text: "Choisis ton parcours !"
            font_size: 30
        Button:
            text: "Parcours 1"
            font_size: 26
            on_press:
                root.parcours_1()
        Button:
            text: "Retour"
            font_size: 20
            on_press:
                root.back_to_menu()

<Parcours_1_Screen>
    
    MapView:
        lat: 45.75
        lon: 4.85
        zoom: 15
        map_source: MapSource(sys.argv[1], attribution="") if len(sys.argv) > 1 else "osm"

        MapMarkerPopup:
            lat: 45.75
            lon: 4.85
            popup_size: dp(230), dp(130)

            Bubble:
                BoxLayout:
                    orientation: "horizontal"
                    padding: "5dp"
                    AsyncImage:
                        source: "http://www.cityzeum.com/images/lieu/bigstock-basilica-of-notre-dame-de-four-47809538.jpg"
                        mipmap: True
                    Label:
                        text: "[b]Lyon[/b]\\n1 506 615 hab\\n5 10 583 hab./km2"
                        markup: True
                        halign: "center"

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
        self.manager.transition.direction = 'right'
    def level_1(self):
        self.manager.current = 'level_1'
        self.manager.transition.direction = 'left'

class Level_1_Screen(Screen):
    def back_to_menu(self):
        self.manager.current = 'chillScreen'
        self.manager.transition.direction = 'right'
    def parcours_1(self):
        self.manager.current = 'parcours_1'
        self.manager.transition.direction = 'left'

class Parcours_1_Screen(Screen):
    pass

# Creation du screenmanager
sm = ScreenManager()
sm.add_widget(MenuScreen(name='menu'))
sm.add_widget(GameModeScreen(name='gamemode'))
sm.add_widget(ChillScreen(name='chillScreen'))
sm.add_widget(Level_1_Screen(name= 'level_1'))
sm.add_widget(Parcours_1_Screen(name= 'parcours_1'))

class TestApp(App):

    def build(self):
        return sm

if __name__ == '__main__':
    TestApp().run()
