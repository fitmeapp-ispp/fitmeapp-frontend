<template>
    <h3>ADMINISTRAR RECETAS</h3>
    <div class="grid">
        <div class="col-12 xl:col-8">
            <div class="tabla">
            <DataTable :value="dataviewValue" :rows="7" :paginator="true" class="p-datatable-gridlines" dataKey="id">
                <Column field="receta" header="Receta" :style="{width:'100px'}">
                </Column>

                <Column field="ingredientes" header="Ingredientes" :style="{width:'100px'}">
                </Column>


            </DataTable>

            </div>

        </div>


        <!-- Añadir ruta a nuevo -->
        <div class="col-12 xl:col-2">
            <router-link to="/add_receta">
            <button class="p-button p-component mr-2 mb-2" style="background-color: #9c9c9c;">
                <h5> Añadir nueva</h5>
            </button>
            </router-link>
        </div>

    </div>
</template>