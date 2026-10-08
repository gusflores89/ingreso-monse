"""Escenas didácticas originales. Las mismas formas vectoriales llegan a PDF y web.

Las alturas de líquido y longitudes representan cantidades, no adornos.
"""
from reportlab.graphics.shapes import Drawing, Rect, Circle, Line, String, Polygon, Path
from reportlab.lib.colors import HexColor, white

INK=HexColor('#183c50'); BLUE=HexColor('#217aa1'); PALE=HexColor('#e9f4f7')
ORANGE=HexColor('#efad35'); GREEN=HexColor('#29856b'); RED=HexColor('#b34342')

class Scene:
    def __init__(self): self.d=Drawing(499,250)
    def text(self,x,y,s,size=16,color=INK,bold=False):
        self.d.add(String(x,y,s,fontName='FichaBold' if bold else 'Ficha',fontSize=size,fillColor=color))
    def rect(self,x,y,w,h,fill=PALE,stroke=INK,**kw):
        self.d.add(Rect(x,y,w,h,fillColor=fill,strokeColor=stroke,strokeWidth=2,**kw))
    def line(self,x,y,a,b,color=INK,width=2,**kw): self.d.add(Line(x,y,a,b,strokeColor=color,strokeWidth=width,**kw))
    def circle(self,x,y,r=8,fill=ORANGE): self.d.add(Circle(x,y,r,fillColor=fill,strokeColor=INK,strokeWidth=1))
    def poly(self,points,fill=PALE,stroke=INK): self.d.add(Polygon(points,fillColor=fill,strokeColor=stroke,strokeWidth=2))
    def arrow(self,x,y,a,b,color=BLUE):
        import math
        self.line(x,y,a,b,color); angle=math.atan2(b-y,a-x)
        self.poly([a,b,a-10*math.cos(angle-.45),b-10*math.sin(angle-.45),a-10*math.cos(angle+.45),b-10*math.sin(angle+.45)],color,color)
    def cookie(self,x,y,r=10):
        self.circle(x,y,r,HexColor('#e7b575'))
        for a,b in [(-3,3),(4,2),(0,-4)]:self.circle(x+a,y+b,1.4,HexColor('#69442e'))
    def pencil(self,x,y,h=58):
        self.rect(x,y,9,h,ORANGE);self.poly([x,y,x+9,y,x+4.5,y-10],HexColor('#ead3b6'))
        self.line(x+4.5,y-7,x+4.5,y-10);self.rect(x,y+h,9,6,HexColor('#eaa2a2'))
    def bag(self,x,y,n=2,color=PALE):
        self.poly([x,y,x+88,y,x+80,y+70,x+67,y+82,x+22,y+82,x+9,y+70],color)
        self.line(x+24,y+73,x+64,y+73)
        for i in range(n):self.cookie(x+27+(i%2)*34,y+25+(i//2)*27,9)
    def jug(self,x=65,y=35,w=135,h=160,level=.5,labels=True):
        # Rectangular inner section: height and volume have the same ratio.
        self.rect(x+w-3,y+h*.27,35,h*.51,None,BLUE,rx=16,ry=16)
        self.rect(x+w+1,y+h*.35,20,h*.34,white,BLUE,rx=8,ry=8)
        self.rect(x,y,w,h,white,BLUE,rx=8,ry=8)
        self.rect(x+3,y+3,w-6,(h-6)*level,ORANGE,None)
        self.line(x+3,y+3+(h-6)*level,x+w-3,y+3+(h-6)*level,HexColor('#b97209'),3)
        self.poly([x,y+h-5,x-18,y+h+12,x+22,y+h+12],white,BLUE)
        self.line(x+10,y+12,x+10,y+h-20,white,3)
        for fraction,label in [(0,'0 L'),(.5,'0,5 L'),(1,'1 L')]:
            yy=y+3+(h-6)*fraction
            self.line(x+w-25,yy,x+w-3,yy,INK)
            if labels:self.text(x+w+48,yy-4,label,17,bold=True)
        return y+3+(h-6)*level
    def book(self,x,y,title,w=125,h=140):
        self.rect(x,y,w,h,PALE,BLUE,rx=4,ry=4);self.line(x+12,y,x+12,y+h,BLUE)
        self.text(x+24,y+h-35,title,21,bold=True)
        for i in range(3):self.line(x+24,y+35+i*13,x+w-15,y+35+i*13,HexColor('#a8c7d2'))

def scene_for(tema):
    s=Scene()
    if tema=='decimales_conversion':
        level=s.jug(level=.5)
        s.text(290,217,'¿Hasta dónde hay jugo?',17,bold=True)
        s.arrow(324,level+22,207,level)
        s.text(300,level+40,'Hasta la mitad',17,bold=True)
        s.text(298,67,'medio litro = 0,5 L',16)
        s.text(298,39,'L significa litro',14)
        s.text(50,12,'Las rayitas permiten leer cuánto líquido hay.',15)
    elif tema=='fracciones_concepto':
        s.text(12,225,'Esta jarra llena contiene 1 litro.',18,bold=True)
        s.jug(28,40,90,147,1,False)
        for i in range(5):s.line(30,43+(141*i/4),115,43+(141*i/4),white if i<4 else INK,2)
        s.text(5,18,'Antes: todo el jugo',15)
        s.arrow(159,126,193,126)
        for i in range(4):
            x=210+i*69;s.poly([x,69,x+40,69,x+46,165,x-6,165],white,BLUE)
            s.poly([x+2,72,x+38,72,x+42,150,x-2,150],ORANGE,ORANGE)
            if i<3:s.rect(x-8,64,56,108,None,RED,rx=4,ry=4)
            s.text(x+3,45,'1/4',16)
        s.text(200,196,'Después: 4 partes iguales',16,bold=True)
        s.text(206,14,'Elegimos 3 partes: 3/4',17,bold=True)
    elif tema=='si_me_la_masa_capacidad_tiempo':
        s.text(12,226,'Cada pregunta necesita su medida.',18,bold=True)
        s.rect(15,65,132,37,PALE,BLUE,rx=7,ry=7);s.rect(37,78,90,19,white,BLUE)
        s.text(50,81,'500 g',15);s.rect(46,116,71,63,HexColor('#fff2d2'))
        s.text(53,147,'harina',15);s.line(32,111,130,111,BLUE,4)
        s.text(15,40,'masa: gramos',15)
        s.jug(190,66,75,109,.5,False);s.text(198,188,'1 L',18,bold=True)
        s.text(167,40,'cabe hasta 1 litro',14);s.text(171,17,'hay medio litro',14)
        s.rect(347,87,140,92,PALE,BLUE,rx=9,ry=9)
        s.text(358,148,'0 min → 5 min',16)
        s.text(361,113,'pasaron 5',21,bold=True)
        s.text(350,40,'tiempo: minutos',15)
    elif tema=='numeros_naturales_sistema_decimal':
        s.text(18,222,'12 lápices: los mismos, organizados.',18,bold=True)
        s.rect(26,50,289,132,PALE,BLUE,rx=8,ry=8)
        for i in range(10):s.pencil(44+i*26,83,57)
        for i in range(2):s.pencil(365+i*43,83,57)
        s.text(63,24,'10 juntos: una decena',17);s.text(344,24,'2 sueltos',17)
    elif tema in ['tablas_multiplicar_2_5','divisibilidad_primos_mcm_mcd','proporcionalidad_regla_3']:
        pencils=tema=='divisibilidad_primos_mcm_mcd'
        s.text(16,221,'6 lápices en grupos de 2' if pencils else '3 bolsitas · 2 galletitas en cada una',18,bold=True)
        for i in range(3):
            x=44+150*i;s.bag(x,68,0 if pencils else 2)
            if pencils:s.pencil(x+30,85,45);s.pencil(x+52,85,45)
            s.text(x+25,40,'2',20,bold=True)
        s.text(115,10,'2 + 2 + 2 = 6',22,bold=True)
        if pencils:s.text(65,185,'No queda ningún lápiz suelto.',16)
    elif tema=='tablas_multiplicar_6_8':
        s.text(16,225,'Cada fila tiene 2 sillas.',19,bold=True)
        for i in range(6):
            y=194-i*35
            if i==5:s.rect(40,y-8,195,32,HexColor('#fff0ca'),ORANGE,rx=4,ry=4)
            s.text(9,y,str(i+1),14)
            for x in [64,158]:
                s.rect(x,y+12,27,9,PALE,BLUE);s.rect(x,y,32,5,PALE,BLUE)
                s.line(x,y-6,x,y+21,BLUE);s.line(x+28,y,x+28,y-6,BLUE)
        s.text(275,140,'5 filas: 10 sillas',19,bold=True)
        s.text(275,53,'1 fila más: 2 sillas',18)
        s.text(280,17,'10 + 2 = 12',20,bold=True)
    elif tema=='tablas_multiplicar_9_10':
        s.text(14,226,'Cada par tiene 2 medias.',18,bold=True)
        for i in range(10):
            x=28+(i%5)*94;y=141-(i//5)*88
            for j in range(2):
                a=x+j*27;s.poly([a,y+48,a+16,y+48,a+16,y+12,a+24,y+7,a+24,y,a,y],PALE,BLUE)
            if i==9:s.rect(x-8,y-6,70,64,None,RED);s.line(x-6,y-4,x+60,y+55,RED,3)
        s.text(70,9,'Apartamos 1 par. Quedan 9 pares: 18 medias.',16)
    elif tema=='numeros_romanos':
        s.rect(30,30,195,164,white,BLUE,rx=5,ry=5);s.rect(225,30,241,164,white,BLUE,rx=5,ry=5)
        s.text(64,166,'Capítulos',21,bold=True)
        for i,t in enumerate(['I','II','III']):s.text(65,127-i*33,t+'   '+['primero','segundo','tercero'][i],19)
        s.rect(47,49,160,29,None,ORANGE);s.arrow(203,64,256,64)
        s.text(269,157,'Capítulo III',24,bold=True);s.text(272,114,'El tercero',21)
        s.text(35,220,'Abrimos la tercera parte del libro.',19,bold=True)
    elif tema=='division_1_digito':
        s.text(16,225,'8 fichas para 4 personas, por igual.',18,bold=True)
        for i,name in enumerate(['Ana','Luz','Leo','Teo']):
            x=60+i*126;s.circle(x,156,38,white);s.circle(x-14,156);s.circle(x+14,156);s.text(x-16,91,name,17)
        s.text(104,45,'Cada persona recibe 2 fichas.',18,bold=True)
        s.text(174,12,'8 ÷ 4 = 2',24,bold=True)
    elif tema=='fracciones_operaciones':
        s.text(14,225,'Una misma cinta, cortada en 4 partes iguales.',17,bold=True)
        for i in range(4):
            x=38+i*105;s.rect(x,108,105,54,ORANGE if i<2 else white,BLUE)
            s.text(x+34,126,'1/4',20)
        s.text(47,181,'primero',16);s.text(153,181,'después',16)
        s.line(40,91,248,91,ORANGE,5);s.text(118,61,'2/4 usados',21,bold=True)
        s.text(109,17,'1/4 + 1/4 = 2/4',23,bold=True)
    elif tema=='fracciones_del_resto':
        s.text(12,225,'De 8 galletitas, usamos 4.',19,bold=True)
        for i in range(8):
            x=28+i*62;s.cookie(x,155,16)
            if i<4:s.line(x-17,134,x+17,176,RED,3)
        s.rect(258,89,228,101,None,BLUE,rx=8,ry=8)
        s.rect(261,128,105,58,None,ORANGE,rx=8,ry=8)
        s.text(26,103,'4 usadas',17);s.text(270,103,'quedan 4',18,bold=True)
        s.text(220,45,'Guardamos 2 de las 4 que quedan.',17)
        s.text(260,17,'Eso es la mitad del resto.',16)
    elif tema=='potenciacion_y_raiz_cuadrada':
        s.text(15,225,'3 filas de 3 fichas forman un cuadrado.',18,bold=True)
        for row in range(3):
            for col in range(3):s.circle(85+col*42,76+row*42,13,ORANGE)
        s.text(66,32,'3 por lado',18);s.text(282,143,'9 en total',23,bold=True)
        s.text(274,99,'3 × 3 = 9',23);s.text(279,52,'3² = 9',23)
    elif tema=='jerarquia_operaciones':
        s.text(16,225,'Dos bolsas y un pan suelto.',19,bold=True)
        for x in [45,215]:
            s.bag(x,70,0)
            for a,b in [(22,28),(59,28),(42,55)]:
                s.circle(x+a,70+b,12,HexColor('#e6b376'));s.line(x+a-4,70+b-4,x+a+4,70+b+4,white)
        s.circle(415,117,16,HexColor('#e6b376'));s.line(409,109,421,125,white)
        s.text(161,109,'+',22);s.text(351,109,'+',22)
        s.text(68,43,'3 panes',16);s.text(237,43,'3 panes',16);s.text(388,43,'1 pan',16)
        s.text(95,10,'2 × 3 + 1 = 7 panes',23,bold=True)
    elif tema=='si_me_la_longitud':
        s.text(16,224,'La cinta empieza en el 0.',19,bold=True)
        s.rect(65,140,360,36,ORANGE,ORANGE);s.text(186,188,'cinta',18)
        s.rect(65,74,385,50,HexColor('#f8e5b5'),INK)
        for i in range(7):
            x=65+i*60;s.line(x,124,x,101);s.text(x-4,81,str(i),15)
        for i in range(6):s.line(95+i*60,124,95+i*60,114)
        s.text(446,94,'cm',13);s.text(87,32,'6 espacios de 1 cm: la cinta mide 6 cm.',17)
    elif tema=='geometria_angulos':
        s.text(15,225,'Girar un cuarto de vuelta.',19,bold=True)
        s.circle(125,119,77,PALE);s.arrow(125,119,125,182);s.arrow(125,119,188,119,ORANGE)
        s.text(91,204,'antes',16);s.text(206,115,'después',16)
        p=Path(strokeColor=ORANGE,strokeWidth=4,fillColor=None);p.moveTo(125,170);p.curveTo(154,170,177,147,177,119);s.d.add(p)
        s.text(288,164,'1/4 de vuelta',21,bold=True)
        s.text(289,117,'ángulo recto',19);s.text(288,76,'como esta esquina:',15)
        s.line(356,23,356,61,BLUE,4);s.line(356,23,394,23,BLUE,4)
    elif tema=='geometria_triangulos':
        s.text(17,224,'La figura gira; sus 3 lados siguen ahí.',18,bold=True)
        s.poly([37,61,194,61,100,173],PALE,BLUE);s.poly([420,32,420,189,308,95],PALE,BLUE)
        s.arrow(221,109,280,109);s.text(37,22,'3 lados, cerrado',17);s.text(306,12,'3 lados, cerrado',17)
    elif tema=='geometria_cuadrilateros_circunferencia':
        s.text(10,223,'Seguí los bordes con el dedo.',19,bold=True)
        s.rect(29,76,132,105,white,BLUE);s.line(39,163,150,163,HexColor('#b8ced6'));s.text(38,42,'hoja: 4 lados',16)
        s.circle(262,127,53,HexColor('#f3d477'));s.circle(262,127,44,HexColor('#f3d477'));s.text(228,42,'moneda',17)
        s.circle(423,128,48,white);s.text(362,62,'solo el borde:',14);s.text(358,39,'circunferencia',16)
        s.text(178,10,'El círculo incluye también el interior.',16)
    elif tema in ['perimetros_simples','perimetros_compuestos']:
        composed=tema=='perimetros_compuestos';x,y,w,h=112,65,240,120 if composed else 160
        if not composed:y=47
        s.rect(x,y,w,h,PALE,ORANGE)
        if composed:
            s.line(232,y,232,y+h,BLUE,2,strokeDashArray=[5,4]);s.text(116,230,'La línea de adentro no se rodea.',16)
            for i in range(2):s.text(151+i*120,y+h+13,'1 cm',17);s.text(151+i*120,y-28,'1 cm',17)
            s.text(49,103,'1 cm',17);s.text(376,103,'1 cm',17);s.text(140,8,'Por fuera: 6 cm',23,bold=True)
        else:
            s.text(203,221,'3 cm',18);s.text(203,19,'3 cm',18);s.text(40,125,'2 cm',18);s.text(378,125,'2 cm',18)
        # Direction marks show the entire path, not just a measurement label.
        s.arrow(x+15,y+h,x+75,y+h,RED);s.arrow(x+w,y+h-12,x+w,y+15,RED);s.arrow(x+w-15,y,x+w-75,y,RED);s.arrow(x,y+12,x,y+h-15,RED)
    elif tema=='graficos_estadisticos':
        s.text(15,225,'Cada ficha representa a una persona.',18,bold=True)
        for i,(label,n) in enumerate([('manzana',3),('banana',2),('pera',1)]):
            y=168-i*65;s.text(10,y-5,label,18)
            for j in range(n):s.circle(190+j*90,y,21,ORANGE);s.text(183+j*90,y-6,'1',18)
    elif tema in ['secuencias_aritmeticas','secuencias_geometricas_fibonacci']:
        doubling=tema=='secuencias_geometricas_fibonacci';nums=[1,2,4,8] if doubling else [2,4,6,8]
        s.text(10,223,'Cada paso duplica el grupo.' if doubling else 'Cada paso agrega 2 fichas.',19,bold=True)
        for i,n in enumerate(nums):
            x=19+i*127
            for j in range(n):
                nuevo=(j>=n//2 if doubling else j>=n-2) and i>0
                px=x+17+(j%2)*27;py=151-(j//2)*26
                s.circle(px,py,9,ORANGE if nuevo else PALE)
                if nuevo:s.circle(px,py,12,None)
            s.text(x+29,31,str(n),23,bold=True)
            if i<3:s.arrow(x+62,171,x+109,171);s.text(x+65,189,'× 2' if doubling else '+ 2',15)
    elif tema=='secuencias_alfanumericas_y_figuras':
        s.text(12,224,'Una pulsera repite este grupo de cuentas.',17,bold=True)
        s.line(17,145,481,145,BLUE,4)
        for i in range(9):
            x=37+i*52
            if i%3==0:s.poly([x-17,128,x+17,128,x+17,162,x-17,162],ORANGE)
            else:s.circle(x,145,17,PALE)
            s.text(x-5,101,'A' if i%3==0 else 'B',18)
        for i in range(3):s.rect(17+i*156,81,144,102,None,BLUE,rx=7,ry=7)
        s.text(89,32,'A, B, B | A, B, B | A, B, B',20,bold=True)
    elif tema=='ecuaciones_con_imagenes_2_incognitas':
        s.text(15,222,'Cada bolsa roja guarda lo mismo.',18,bold=True)
        for y,total,c in [(125,6,HexColor('#f4b6a8')),(18,5,PALE)]:
            s.bag(27,y,0,HexColor('#f4b6a8'));s.text(143,y+32,'+',24)
            s.bag(199,y,0,c);s.text(313,y+32,'=',24);s.text(365,y+32,str(total)+' fichas',21,bold=True)
    else:
        return language_scene(tema)
    return s.d

def language_scene(tema):
    """En Lengua señalamos palabras y relaciones; no decoramos con mascotas."""
    s=Scene()
    if tema=='ortografia_h':
        # Insecto y entrada al hormiguero, unidos a palabras con h destacada.
        for x,r in [(69,14),(97,12),(130,19)]:s.circle(x,151,r,HexColor('#986749'))
        for x in [87,108,126]:s.line(x,149,x-15,127);s.line(x,151,x+12,174)
        s.line(59,160,49,174);s.line(62,162,60,181)
        s.poly([325,122,359,179,411,122],HexColor('#dcb789'));s.circle(369,134,12,INK)
        s.text(53,84,'h',31,RED,True);s.text(72,84,'ormiga',31)
        s.text(292,84,'h',31,RED,True);s.text(311,84,'ormiguero',27)
        s.arrow(170,145,282,145);s.text(35,27,'Mirá la primera letra: las dos empiezan con h.',17)
    elif tema in ['ortografia_b_v','ortografia_c_s_z','ortografia_g_j_gu_gu']:
        if tema=='ortografia_b_v':pairs=[('li','b','ro'),('li','b','rería')];caption='En esta familia de palabras conservamos la b.'
        elif tema=='ortografia_c_s_z':pairs=[('lápi','z',''),('lápi','c','es')];caption='Uno: lápiz. Varios: lápices.'
        else:pairs=[('','ga','to'),('','gue','rra')];caption='gue conserva ese sonido; la u no suena.'
        for i,(a,b,c) in enumerate(pairs):
            x=28+i*250
            if tema=='ortografia_b_v':
                if i==0:s.book(x+48,125,'',95,77)
                else:
                    s.rect(x+34,127,133,78,white,BLUE)
                    s.rect(x+25,183,151,28,PALE,BLUE)
                    s.text(x+39,191,'LIBRERÍA',17,bold=True)
                    for book_index in range(5):s.rect(x+45+book_index*18,138,12,30,ORANGE,BLUE)
            elif tema=='ortografia_c_s_z':
                for pencil_index in range(1+i):s.pencil(x+60+pencil_index*32,139,48)
            else:s.text(x+45,162,'ga-to' if i==0 else 'gue-rra',22)
            from reportlab.pdfbase.pdfmetrics import stringWidth
            s.text(x,82,a,27);x+=stringWidth(a,'Ficha',27);s.text(x,82,b,27,RED,True);x+=stringWidth(b,'FichaBold',27);s.text(x,82,c,27)
        s.arrow(214,155,270,155);s.text(15,23,caption,17)
    elif tema in ['tildes_generales_agudas_graves_esdrujulas','diptongo_hiato']:
        rows=[['CA','sa'],['ca','FÉ']] if tema.startswith('tildes') else [['ai','re'],['pa','ís']]
        s.text(12,221,'Cada recuadro es una sílaba.',18,bold=True)
        for i,row in enumerate(rows):
            for j,part in enumerate(row):
                x=60+j*211;y=139-i*83;s.rect(x,y,155,55,PALE if part.islower() else HexColor('#ffe2a0'),BLUE,rx=8,ry=8);s.text(x+49,y+15,part,27,bold=True)
        s.text(30,13,'La parte destacada suena más fuerte.' if tema.startswith('tildes') else 'ai va junto; en país, a e í se separan.',17)
    elif tema=='tilde_diacritica_monosilabos':
        s.circle(108,168,22,PALE);s.line(108,143,108,87,BLUE,5);s.line(108,130,70,102,BLUE,5);s.line(108,130,145,102,BLUE,5)
        s.book(320,84,'',94,108)
        s.text(83,39,'Tú',31,RED,True);s.text(288,39,'tu cuaderno',27)
        s.text(28,13,'la persona',16);s.text(293,13,'lo que le pertenece',15)
    elif tema=='sustantivos_genero_numero_tipo':
        s.pencil(92,118,75);s.text(34,64,'un lápiz',27)
        for x in [322,353]:s.pencil(x,118,75)
        s.text(284,64,'dos lápices',27);s.text(60,19,'Las palabras lápiz y lápices nombran objetos.',16)
    elif tema=='verbos_modo_indicativo_tiempos':
        s.arrow(19,115,480,115)
        for x,when,word in [(27,'AYER','jugué'),(197,'HOY','juego'),(359,'MAÑANA','jugaré')]:
            s.text(x,183,when,20,bold=True);s.text(x,141,word,24,RED);s.circle(x+39,115,7,BLUE)
        s.text(80,40,'Ya pasó → ahora → después',22)
    elif tema in ['sujeto_predicado_nucleo','concordancia_sujeto_verbo']:
        pairs=[('La gata','duerme'),('Las gatas','duermen')] if tema.startswith('concordancia') else [('La gata','duerme')]
        for i,(a,b) in enumerate(pairs):
            y=153-i*89;s.rect(20,y,209,50,PALE,BLUE,rx=6,ry=6);s.rect(269,y,209,50,HexColor('#fff0ca'),ORANGE,rx=6,ry=6)
            s.text(39,y+15,a,26);s.text(289,y+15,b,26)
        if len(pairs)==1:s.text(33,112,'de quién hablamos',17);s.text(281,112,'qué decimos de ella',17)
        s.text(40,25,'Si hablamos de varias, cambiamos las dos partes.' if len(pairs)==2 else 'Sujeto                         Predicado',17)
    elif tema=='comprension_lectora_literal_inferida':
        s.rect(12,107,476,98,white,BLUE,rx=8,ry=8)
        s.text(28,172,'Luz abrió el paraguas antes de salir.',20)
        s.text(28,135,'Afuera caía una lluvia fuerte.',20)
        from reportlab.pdfbase.pdfmetrics import stringWidth
        for prefix,word,y in [('Luz abrió el ','paraguas',164),('Afuera caía una ','lluvia fuerte',127)]:
            x=28+stringWidth(prefix,'Ficha',20);s.line(x,y,x+stringWidth(word,'Ficha',20),y,ORANGE,4)
        s.arrow(241,99,241,64);s.text(46,32,'La lluvia es una pista: quiere evitar mojarse.',17)
    elif tema=='discurso_conectores_sinonimos':
        for x in [56,78,99,121]:s.line(x,178,x-9,152,BLUE,3)
        s.text(26,119,'Llueve',24);s.arrow(166,138,306,138);s.text(189,163,'por eso',19,RED,True)
        s.rect(331,96,148,91,PALE,BLUE);s.line(336,101,474,182,RED,4);s.text(345,143,'PARTIDO',19);s.text(339,119,'suspendido',16)
        s.text(60,47,'causa',20);s.text(336,47,'consecuencia',18)
    elif tema=='produccion_escrita_narracion':
        for i,label in enumerate(['No está la llave','Teo la busca','La encuentra']):
            x=7+i*168;s.rect(x,52,151,142,white,BLUE,rx=7,ry=7);s.text(x+10,207,str(i+1),20,bold=True);s.text(x+7,28,label,14)
            s.rect(x+33,80,89,8,HexColor('#d4b080'));s.line(x+42,80,x+42,61);s.line(x+112,80,x+112,61)
            if i>0:s.book(x+37,98,'',67,49)
            if i==2:s.circle(x+60,91,5,ORANGE);s.line(x+65,91,x+87,91,ORANGE,3);s.line(x+85,91,x+85,84,ORANGE,3)
            elif i==0:s.text(x+67,118,'?',31,RED,True)
    else:return None
    return s.d
