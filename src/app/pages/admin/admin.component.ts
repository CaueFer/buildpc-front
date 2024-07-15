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
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
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

            this.fetchCategorias();
          }
        },
        error: (error) => {
          if (error) {
            console.error('Erro ao adicionar categoria:', error);

            this.errorAlert();
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

            this.fetchCategorias();
          }
        },
        error: (error) => {
          if (error) {
            console.error('Erro ao atualizar categoria:', error);

            this.errorAlert();
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

              this.fetchCategorias();
            }
          },
          error: (error) => {
            if (error) {
              console.error('Erro ao deletar categoria:', error);

              this.errorAlert();
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

            this.fetchComponentes();
          }
        },
        error: (error) => {
          if (error) {
            console.error('Erro ao adicionar componente:', error);

            this.errorAlert();
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

      this._dbService
        .editComponente(this.componenteId, newComponent)
        .subscribe({
          next: (response) => {
            if (response) {
              this._modalService.dismissAll();
              this.sucessAlert('Componente atualizado!');

              this.fetchComponentes();
            }
          },
          error: (error) => {
            if (error) {
              console.error('Erro ao atualizar componente:', error);

              this.errorAlert();
            }
          },
        });
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
              this.fetchComponentes();
            }
          },
          error: (error) => {
            console.error('Erro ao deletar componente:', error);
            this.errorAlert();
          },
        });
      }
    });
  }
  // COMPONENTES END ================================

  errorAlert() {
    Swal.fire({
      title: 'Error!',
      text: 'Aconteceu um erro, tente novamente!',
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
