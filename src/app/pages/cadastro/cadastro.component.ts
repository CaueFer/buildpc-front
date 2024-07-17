import { Component, TemplateRef } from '@angular/core';
import { Dbservice } from '../../core/services/dbservice.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  categorias: any[] = [];
  componentes: any[] = [];

  categoriaForm!: FormGroup;
  componenteForm!: FormGroup;

  categoriaId!: number;
  componenteId!: number;

  submitted: boolean = false;
  isLoading: boolean = true;

  constructor(
    private _dbService: Dbservice,
    private _modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.categoriaForm = this.fb.group({
      nome: ['', Validators.required],
    });

    this.componenteForm = this.fb.group({
      nome: ['', Validators.required],
      desc: ['', Validators.required],
      id_categoria: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchCategorias();

    this.fetchComponentes();
  }

  fetchCategorias() {
    this._dbService.getAllCategorias().subscribe((categorias) => {
      this.categorias = categorias;
      //console.log(categorias);
    });
  }

  fetchComponentes() {
    this._dbService.getAllComponentes().subscribe((componente) => {
      this.componentes = componente.sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );
      //console.log(this.componentes);
      this.isLoading = false;
    });
  }

  open(content: TemplateRef<any>) {
    this._modalService.open(content, { centered: true });
  }

  // CATEGORIAS START ================================
  submitCategoria() {
    this.submitted = true;

    if (this.categoriaForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 3000);

      return;
    }

    if (this.categoriaForm.valid) {
      const newCat = {
        nome: this.categoriaForm.get('nome'),
      };

      this._dbService.addCategoria(this.categoriaForm.value).subscribe({
        next: (response) => {
          if (response) {
            this._modalService.dismissAll();
            this.sucessAlert('Categoria adicionada!');

            this.submitted = false;
            this.fetchCategorias();
          }
        },
        error: (error) => {
          if (error) {
            console.error('Erro ao adicionar categoria:', error);

            this.submitted = false;
            this.errorAlert('Aconteceu um erro, tente novamente!');
          }
        },
      });
    }
  }
  showEditCategoriaModal(id: any) {
    this.categoriaId = id;
  }
  editCategoria() {
    this.submitted = true;

    if (this.categoriaForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 3000);

      return;
    }

    if (this.categoriaForm.valid) {
      const newCat = {
        nome: this.categoriaForm.get('nome')?.value,
      };

      this._dbService.editCategoria(this.categoriaId, newCat).subscribe({
        next: (response) => {
          if (response) {
            this._modalService.dismissAll();
            this.sucessAlert('Categoria atualizada!');

            this.submitted = false;
            this.fetchCategorias();
          }
        },
        error: (error) => {
          if (error) {
            //console.error('Erro ao atualizar categoria:', error);

            if (error.status === 403)
              this.errorAlert('Sem permissão para editar item!');
            else this.errorAlert('Aconteceu um erro, tente novamente!');
            
            this._modalService.dismissAll();
            this.submitted = false;
          }
        },
      });
    }
  }
  deleteCategoria(id: any) {
    this.submitted = true;

    this.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this._dbService.removeCategoria(id).subscribe({
          next: (response) => {
            if (response) {
              this._modalService.dismissAll();
              this.sucessAlert('Categoria deletada!');

              this.submitted = false;
              this.fetchCategorias();
            }
          },
          error: (error) => {
            if (error) {
              //console.error('Erro ao deletar categoria:', error);

              if (error.status === 403) this.errorAlert('Sem permissão para deletar item!');
              else this.errorAlert('Aconteceu um erro, tente novamente!');

              this.submitted = false;
            }
          },
        });
      }
    });
  }
  // CATEGORIAS END ================================

  // COMPONENTES START ================================
  submitComponente() {
    this.submitted = true;

    if (this.componenteForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 3000);

      return;
    }

    if (this.componenteForm.valid) {
      const newComponent = {
        nome: this.componenteForm.get('nome')?.value,
        descricao: this.componenteForm.get('desc')?.value,
        categoria: this.componenteForm.get('id_categoria')?.value,
      };

      this._dbService.addComponente(newComponent).subscribe({
        next: (response) => {
          if (response) {
            this._modalService.dismissAll();
            this.sucessAlert('Componente adicionado!');

            this.submitted = false;
            this.fetchComponentes();
          }
        },
        error: (error) => {
          if (error) {
            // console.error('Erro ao adicionar componente:', error);

            if (error.status === 403) this.errorAlert('Sem permissão!');
            else this.errorAlert('Aconteceu um erro, tente novamente!');

            this.submitted = false;
          }
        },
      });
    }
  }
  showEditComponenteModal(id: any) {
    this.componenteId = id;

    let tempComponente = this.componentes.find((componente) => {
      return componente.id === id;
    });

    this.componenteForm.patchValue({
      nome: tempComponente.nome,
      desc: tempComponente.descricao,
      id_categoria: tempComponente.categoria.id,
    });
  }
  editComponente() {
    this.submitted = true;

    if (this.componenteForm.invalid) {
      setTimeout(() => {
        this.submitted = false;
      }, 3000);

      return;
    }

    if (this.componenteForm.valid) {
      const newComponent = {
        nome: this.componenteForm.get('nome')?.value,
        descricao: this.componenteForm.get('desc')?.value,
        categoria: this.componenteForm.get('id_categoria')?.value,
      };

      try {
        this._dbService
        .editComponente(this.componenteId, newComponent)
        .subscribe({
          next: (response) => {
            if (response) {
              this._modalService.dismissAll();
              this.sucessAlert('Componente atualizado!');

              this.submitted = false;
              this.fetchComponentes();
            }
          },
          error: (error) => {
            if (error) {
              //console.error('Erro ao atualizar componente:', error);

              if (error.status === 403)
                this.errorAlert('Sem permissão para editar item!');
              else this.errorAlert('Aconteceu um erro, tente novamente!');

              this._modalService.dismissAll();
              this.submitted = false;
            }
          },
        });
      }
      catch(err) {
        this.submitted = false;

        console.error(err)
      };
      
    }
  }
  deleteComponente(id: any) {
    this.deleteAlert().then((result) => {
      if (result.isConfirmed) {
        this._dbService.removeComponente(id).subscribe({
          next: (response) => {
            if (response) {
              this._modalService.dismissAll();
              this.sucessAlert('Componente deletado!');

              this.submitted = false;
              this.fetchComponentes();
            }
          },
          error: (error) => {
            //console.error('Erro ao deletar componente:', error);

            if (error.status === 403) this.errorAlert('Sem permissão para deletar item!');
            else this.errorAlert('Aconteceu um erro, tente novamente!');

            this.submitted = false;
          },
        });
      }
    });
  }
  // COMPONENTES END ================================

  errorAlert(msg: string) {
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

  sucessAlert(message: string) {
    Swal.fire({
      title: 'Sucesso!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }

  deleteAlert() {
    return Swal.fire({
      title: 'Tem certeza?',
      text: 'Esta ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Deletar',
    });
  }
}
