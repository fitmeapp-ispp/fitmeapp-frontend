 <template>
 <div>
    <div class="support">
        <Button @click="openResponsive" icon="pi pi-search" style="border-radius:100%; height:6rem; width:6rem;" class="p-button-lg-rounded p-button-success" />
    </div>
    <div>
    <Dialog header="¿Quiéres enviarnos una incidencia?" v-model:visible="displayResponsive" :breakpoints="{'960px': '75vw'}" :style="{width: '50vw'}">
        <h4>Título</h4>
        <InputText type="text" v-model="title" class="p-inputtext-lg" />
        <br>
        <h4>Cuerpo</h4>
        <Textarea v-model="body" rows="4" cols="100" />
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeResponsive" class="p-button-text"/>
            <Button label="Sí" icon="pi pi-check" @click="enviarIssue" autofocus />
        </template>
    </Dialog>
    </div>
    </div>
</template>

<script>

require("dotenv").config();
const fetch= require("node-fetch")
export default {
	data() {
		return {
            title: '',
            body:"",
            displayResponsive: false,
        }
    },    
	methods: {
        openResponsive() {
            this.displayResponsive = true;
        },
        closeResponsive() {
            this.displayResponsive = false;
        },
        enviarIssue(){
            var user=this.$store.state.username
            const url=process.env.VUE_APP_GITAPIURL
            const token= process.env.VUE_APP_GITTOKEN
            var bod = this.body
            if(user){
                bod += (" - " +user)
            }
            var json= JSON.stringify({
                "title":this.title,
                "body":bod,
                "labels": [
                    "client attendant"
                    ]
                })
            fetch(url,{
                method:"post",
                body: json,
                headers: {'Content-Type': 'application/json', 'Authorization': `${token}`}
            }).then(()=>{
                this.closeResponsive()
                this.title=""
                this.body=""
            })
        }
    },
    components: {

    }
}
</script>
<style>
.support{
    position: fixed;
    bottom: 5%;
    right: 5%;
    z-index: 30;
}
</style>
