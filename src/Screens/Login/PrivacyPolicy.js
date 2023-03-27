
import React, { Component } from 'react';
import {TextInput,StatusBar,View,BackHandler,ImageBackground,Pressable,StyleSheet,Dimensions,Text,TouchableOpacity,Alert,Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
        <ImageBackground blurRadius={Platform.OS === 'ios' ? 90 : 300} style={styles.page} source={require('../../Image/bg.png')}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Oy Ver Gizlilik Politikası.</Text>
                <Text style={[styles.label, styles.label1]}>Son güncellenme: 21/03/2023</Text>
                <Text style={[styles.label, styles.label1]}>Güvenliğiniz bizim için önemli. Bu sebeple bizimle paylaşacağınız kişisel verileriz hassasiyetle korunmaktadır.</Text>
                <Text style={[styles.label, ]}>Biz, OyVer, veri sorumlusu olarak, bu gizlilik ve kişisel verilerin korunması politikası ile, hangi kişisel verilerinizin hangi amaçla işleneceği, işlenen verilerin kimlerle ve neden paylaşılabileceği, veri işleme yöntemimiz ve hukuki sebeplerimiz ile; işlenen verilerinize ilişkin haklarınızın neler olduğu hususunda sizleri aydınlatmayı amaçlıyoruz.</Text>
                
                <Text style={[styles.label, styles.label1]}>Toplanan Kişisel Verileriniz, Toplanma Yöntemi ve Hukuki Sebebi</Text>
                <Text style={[styles.label, ]}>Kimlik, (isim, soy isim) iletişim, (adres, e-posta adresi, telefon, IP, konum gibi) özlük, sosyal medya, finans bilgileriniz ile görsel ve işitsel kayıtlarınız tarafımızca, çerezler (cookies) vb. teknolojiler vasıtasıyla, otomatik veya otomatik olmayan yöntemlerle ve bazen de analitik sağlayıcılar, reklam ağları, arama bilgi sağlayıcıları, teknoloji sağlayıcıları gibi üçüncü taraflardan elde edilerek, kaydedilerek, depolanarak ve güncellenerek, aramızdaki hizmet ve sözleşme ilişkisi çerçevesinde ve süresince, meşru menfaat işleme şartına dayanılarak işlenecektir.</Text>
                
                <Text style={[styles.label, styles.label1]}>Kişisel Verilerinizin İşlenme Amacı</Text>
                <Text style={[styles.label, ]}>Bizimle paylaştığınız kişisel verileriniz; hizmetlerimizden faydalanabilmeniz amacıyla sizlerle sözleşmeler kurabilmek, sunduğumuz hizmetlerin gerekliliklerini en iyi şekilde ve aramızdaki sözleşmelere uygun olarak yerine getirebilmek, bu sözleşmelerden doğan haklarınızın tarafınızca kullanılmasını sağlayabilmek, ürün ve hizmetlerimizi, ihtiyaçlarınız doğrultusunda geliştirebilmek ve bu gelişmelerden sizleri haberdar edebilmek, ayrıca sizleri daha geniş kapsamlı hizmet sağlayıcıları ile yasal çerçeveler içerisinde buluşturabilmek ve kanundan doğan zorunlulukların (kişisel verilerin talep halinde adli ve idari makamlarla paylaşılması) yerine getirilebilmesi amacıyla, sözleşme ve hizmet süresince, amacına uygun ve ölçülü bir şekilde işlenecek ve güncellenecektir.</Text>
                
                <Text style={[styles.label, styles.label1]}>Toplanan Kişisel Verilerin Kimlere ve Hangi Amaçlarla Aktarılabileceği</Text>
                <Text style={[styles.label, ]}>Bizimle paylaştığınız kişisel verileriniz; faaliyetlerimizi yürütmek üzere hizmet aldığımız ve/veya verdiğimiz, sözleşmesel ilişki içerisinde bulunduğumuz, iş birliği yaptığımız, yurt içi ve yurt dışındaki 3. şahıslar ile kurum ve kuruluşlara ve talep halinde adli ve idari makamlara, gerekli teknik ve idari önlemler alınması koşulu ile aktarılabilecektir.</Text>
                
                <Text style={[styles.label, styles.label1]}>Kişisel Verileri İşlenen Kişi Olarak Haklarınız</Text>
                <Text style={[styles.label, ]}>KVKK madde 11 uyarınca herkes, veri sorumlusuna başvurarak aşağıdaki haklarını kullanabilir:</Text>
                <Text style={[styles.label, ]}>Kişisel veri işlenip işlenmediğini öğrenme,</Text>
                <Text style={[styles.label, ]}>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</Text>
                <Text style={[styles.label, ]}>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</Text>
                <Text style={[styles.label, ]}>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</Text>
                <Text style={[styles.label, ]}>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</Text>
                <Text style={[styles.label, ]}>Kişisel verilerin silinmesini veya yok edilmesini isteme,</Text>
                <Text style={[styles.label, ]}>(e) ve (f) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</Text>
                <Text style={[styles.label, ]}>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</Text>
                <Text style={[styles.label, ]}>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme, haklarına sahiptir.</Text>
                <Text style={[styles.label, ]}>Yukarıda sayılan haklarınızı kullanmak üzere mertunal010@gmail.com üzerinden bizimle iletişime geçebilirsiniz.</Text>
                
                <Text style={[styles.label, styles.label1]}>İletişim</Text>
                <Text style={[styles.label, ]}>Sizlere talepleriniz doğrultusunda hizmet sunabilmek amacıyla, sadece gerekli olan kişisel verilerinizin, işbu gizlilik ve kişisel verilerin işlenmesi politikası uyarınca işlenmesini, kabul edip etmemek hususunda tamamen özgürsünüz. Uygulamayı kullanmaya devam ettiğiniz takdirde, kabul etmiş olduğunuz tarafımızca varsayılacaktır. Şayet kabul etmiyorsanız, lütfen uygulamayı tüm cihazlarınızdan kaldırınız. Ayrıntılı bilgi için bizimle mertunal010@gmail.com e-mail adresi üzerinden iletişime geçmekten lütfen çekinmeyiniz.</Text>

                <TouchableOpacity style={styles.okButton} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.okButtonText}>Okudum</Text>
                </TouchableOpacity>

                <View style={{height: Platform.OS === 'ios' ? 70 : 10}}></View>
            </ScrollView>
        </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    page: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#333',
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
    },
    title: {
        marginTop: 34,
        fontSize: 25,
        fontFamily: 'Inter-SemiBold',
        color: '#121118'
    },
    subtitle: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        color: '#3B4963'
    },
    okButton: {
        marginTop: 40,
        alignSelf: 'stretch',
        backgroundColor: '#8b5e34',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    okButtonText: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#fff'
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#3B4963'
    },
    label1: {
        marginTop: 12,
    },
});
