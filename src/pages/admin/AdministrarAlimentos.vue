<template>
    <h3>ADMINISTRAR ALIMENTOS</h3>
    <div class="grid">
        <div class="col-12 xl:col-8">
            <div class="tabla">
            <DataTable :value="dataviewValue" :rows="7" :paginator="true" class="p-datatable-gridlines" dataKey="id">
                <Column field="alimento" header="Alimento" :style="{width:'100px'}">
                </Column>

                <Column field="kcal" header="Kcal" :style="{width:'100px'}">
                </Column>

                <Column field="grasas" header="Grasas" :style="{width:'100px'}">
                </Column>

                <Column field="carbs" header="Carbohidratos" :style="{width:'100px'}">
                </Column>

                <Column field="protes" header="Proteínas" :style="{width:'100px'}">
                </Column>

            </DataTable>

            </div>

        </div>


        <!-- Añadir ruta a nuevo -->
        <div class="col-12 xl:col-2">
            <router-link to="/add_alimento">
            <button class="p-button p-component mr-2 mb-2" style="background-color: #9c9c9c;">
                <h5> Añadir nuevo</h5>
            </button>
            </router-link>
        </div>

    </div>
</template>